import { connect } from 'cloudflare:sockets';

const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;
const MAX_LENGTHS = { name: 120, email: 254, subject: 160, message: 8000 };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePayload(payload) {
  const data = {
    name: clean(payload.name),
    email: clean(payload.email),
    subject: clean(payload.subject),
    message: clean(payload.message),
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (Object.values(data).some((value) => !value)) return null;
  if (!emailPattern.test(data.email)) return null;
  if (Object.entries(MAX_LENGTHS).some(([key, limit]) => data[key].length > limit)) return null;
  if (/\r|\n/.test(data.email) || /\r|\n/.test(data.subject)) return null;
  return data;
}

function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

async function readSmtpResponse(reader) {
  const decoder = new TextDecoder();
  let response = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) throw new Error('SMTP connection closed');
    response += decoder.decode(value, { stream: true });
    const lines = response.split('\r\n');
    response = lines.pop() || '';
    for (const line of lines) {
      if (/^\d{3} /.test(line)) {
        const code = Number(line.slice(0, 3));
        if (code >= 400) throw new Error(`SMTP response ${code}`);
        return code;
      }
    }
  }
}

async function sendSmtpEmail(env, enquiry) {
  if (!env.GMAIL_USERNAME || !env.GMAIL_APP_PASSWORD || !env.GMAIL_TO) throw new Error('SMTP secrets are not configured');
  let socket = connect({ hostname: SMTP_HOST, port: SMTP_PORT });
  let reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const send = async (command, expected) => {
    await writer.write(new TextEncoder().encode(`${command}\r\n`));
    const code = await readSmtpResponse(reader);
    if (expected && !expected.includes(code)) throw new Error(`Unexpected SMTP response ${code}`);
  };

  await readSmtpResponse(reader);
  await send('EHLO vlssytechnologies.in', [250]);
  await send('STARTTLS', [220]);
  reader.releaseLock();
  writer.releaseLock();
  socket = socket.startTls();
  reader = socket.readable.getReader();
  const tlsWriter = socket.writable.getWriter();
  const sendTls = async (command, expected) => {
    await tlsWriter.write(new TextEncoder().encode(`${command}\r\n`));
    const code = await readSmtpResponse(reader);
    if (expected && !expected.includes(code)) throw new Error(`Unexpected SMTP response ${code}`);
  };

  await sendTls('EHLO vlssytechnologies.in', [250]);
  await sendTls('AUTH LOGIN', [334]);
  await sendTls(encodeBase64(env.GMAIL_USERNAME), [334]);
  await sendTls(encodeBase64(env.GMAIL_APP_PASSWORD), [235]);
  await sendTls(`MAIL FROM:<${env.GMAIL_USERNAME}>`, [250]);
  await sendTls(`RCPT TO:<${env.GMAIL_TO}>`, [250, 251]);
  await sendTls('DATA', [354]);

  const body = [
    'New Contact Form Enquiry',
    '',
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Subject: ${enquiry.subject}`,
    '',
    'Message:',
    enquiry.message,
  ].join('\r\n').replace(/^\./gm, '..');
  const email = [
    `From: VLSSY Technologies <${env.GMAIL_USERNAME}>`,
    `To: ${env.GMAIL_TO}`,
    `Reply-To: ${enquiry.email}`,
    `Subject: Website Contact: ${enquiry.subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    '',
    body,
    '.',
  ].join('\r\n');
  await tlsWriter.write(new TextEncoder().encode(`${email}\r\n`));
  await readSmtpResponse(reader);
  await sendTls('QUIT', [221]);
  reader.releaseLock();
  tlsWriter.releaseLock();
  await socket.close();
}

async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ success: false, error: 'Method not allowed.' }, 405);
  let payload;
  try { payload = await request.json(); } catch { return json({ success: false, error: 'Invalid request.' }, 400); }
  const enquiry = validatePayload(payload || {});
  if (!enquiry) return json({ success: false, error: 'Please check the submitted fields.' }, 400);
  try {
    await sendSmtpEmail(env, enquiry);
    return json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return json({ success: false, error: 'Unable to send your message.' }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};