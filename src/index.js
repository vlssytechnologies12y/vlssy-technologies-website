import { connect } from "cloudflare:sockets";

const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 587;

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  subject: 160,
  message: 8000,
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload) {
  const data = {
    name: clean(payload?.name),
    email: clean(payload?.email),
    subject: clean(payload?.subject),
    message: clean(payload?.message),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (Object.values(data).some((value) => !value)) {
    return null;
  }

  if (!emailPattern.test(data.email)) {
    return null;
  }

  for (const [key, limit] of Object.entries(MAX_LENGTHS)) {
    if (data[key].length > limit) {
      return null;
    }
  }

  // Prevent SMTP header injection.
  if (/\r|\n/.test(data.email)) {
    return null;
  }

  if (/\r|\n/.test(data.subject)) {
    return null;
  }

  return data;
}

function encodeBase64(value) {
  return btoa(value);
}

async function readSmtpResponse(reader) {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      throw new Error("SMTP connection closed");
    }

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\r\n");

    // Keep incomplete line for next read.
    buffer = lines.pop() || "";

    for (const line of lines) {
      // SMTP final response line:
      // 250 OK
      // 235 Authentication successful
      // 354 Start mail input
      if (/^\d{3} /.test(line)) {
        const code = Number(line.substring(0, 3));

        if (code >= 400) {
          throw new Error(`SMTP response ${code}`);
        }

        return code;
      }
    }
  }
}

async function sendSmtpCommand(writer, reader, command, expectedCodes) {
  const encoder = new TextEncoder();

  await writer.write(
    encoder.encode(`${command}\r\n`)
  );

  const code = await readSmtpResponse(reader);

  if (
    expectedCodes &&
    !expectedCodes.includes(code)
  ) {
    throw new Error(
      `Unexpected SMTP response ${code}`
    );
  }

  return code;
}

async function sendSmtpEmail(env, enquiry) {
  if (
    !env.GMAIL_USERNAME ||
    !env.GMAIL_APP_PASSWORD ||
    !env.GMAIL_TO
  ) {
    throw new Error(
      "SMTP secrets are not configured"
    );
  }

  /*
   * Gmail SMTP:
   * smtp.gmail.com:587
   * STARTTLS
   *
   * IMPORTANT:
   * secureTransport MUST be "starttls"
   * when socket.startTls() is used.
   */
  let socket = connect(
    {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
    },
    {
      secureTransport: "starttls",
    }
  );

  let reader = socket.readable.getReader();
  let writer = socket.writable.getWriter();

  try {
    // --------------------------------------------------
    // 1. Gmail SMTP greeting
    // --------------------------------------------------

    const greeting = await readSmtpResponse(reader);

    if (greeting !== 220) {
      throw new Error(
        `Unexpected SMTP greeting ${greeting}`
      );
    }

    // --------------------------------------------------
    // 2. EHLO
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "EHLO vlssytechnologies.in",
      [250]
    );

    // --------------------------------------------------
    // 3. STARTTLS
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "STARTTLS",
      [220]
    );

    /*
     * Release the existing streams before upgrading
     * the connection to TLS.
     */
    reader.releaseLock();
    writer.releaseLock();

    /*
     * Upgrade the existing socket to TLS.
     *
     * Because the socket was created with:
     *
     * secureTransport: "starttls"
     *
     * this is the correct Cloudflare Workers API usage.
     */
    socket = socket.startTls();

    reader = socket.readable.getReader();
    writer = socket.writable.getWriter();

    // --------------------------------------------------
    // 4. EHLO again after STARTTLS
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "EHLO vlssytechnologies.in",
      [250]
    );

    // --------------------------------------------------
    // 5. Gmail authentication
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "AUTH LOGIN",
      [334]
    );

    await sendSmtpCommand(
      writer,
      reader,
      encodeBase64(env.GMAIL_USERNAME),
      [334]
    );

    await sendSmtpCommand(
      writer,
      reader,
      encodeBase64(env.GMAIL_APP_PASSWORD),
      [235]
    );

    // --------------------------------------------------
    // 6. MAIL FROM
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      `MAIL FROM:<${env.GMAIL_USERNAME}>`,
      [250]
    );

    // --------------------------------------------------
    // 7. RCPT TO
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      `RCPT TO:<${env.GMAIL_TO}>`,
      [250, 251]
    );

    // --------------------------------------------------
    // 8. DATA
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "DATA",
      [354]
    );

    // --------------------------------------------------
    // 9. Email body
    // --------------------------------------------------

    const body = [
      "New Contact Form Enquiry",
      "",
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Subject: ${enquiry.subject}`,
      "",
      "Message:",
      enquiry.message,
    ]
      .join("\r\n")
      // SMTP dot-stuffing.
      .replace(/^\./gm, "..");

    const email = [
      `From: ${enquiry.name} <${enquiry.email}>`,
      `To: ${env.GMAIL_TO}`,
      `Reply-To: ${enquiry.email}`,
      `Subject: Website Contact: ${enquiry.subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      body,
      ".",
    ].join("\r\n");

    const encoder = new TextEncoder();

    await writer.write(
      encoder.encode(`${email}\r\n`)
    );

    // Gmail accepts the message.
    const messageResponse =
      await readSmtpResponse(reader);

    if (messageResponse !== 250) {
      throw new Error(
        `SMTP message rejected with response ${messageResponse}`
      );
    }

    // --------------------------------------------------
    // 10. Quit
    // --------------------------------------------------

    await sendSmtpCommand(
      writer,
      reader,
      "QUIT",
      [221]
    );

  } finally {
    try {
      reader.releaseLock();
    } catch {}

    try {
      writer.releaseLock();
    } catch {}

    try {
      socket.close();
    } catch {}
  }
}

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return json(
      {
        success: false,
        error: "Method not allowed.",
      },
      405
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return json(
      {
        success: false,
        error: "Invalid request.",
      },
      400
    );
  }

  const enquiry = validatePayload(
    payload || {}
  );

  if (!enquiry) {
    return json(
      {
        success: false,
        error: "Please check the submitted fields.",
      },
      400
    );
  }

  try {
    await sendSmtpEmail(
      env,
      enquiry
    );

    return json({
      success: true,
      message:
        "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error(
      "Contact email delivery failed:",
      error?.message || error
    );

    return json(
      {
        success: false,
        error:
          "Unable to send your message.",
      },
      500
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Contact form API.
    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    // Existing HTML/CSS/JS/images.
    return env.ASSETS.fetch(request);
  },
};