export async function POST(request) {
  try {
    const payload = await request.json();

    if (
      !payload?.name ||
      !payload?.email ||
      !payload?.subject ||
      !payload?.message
    ) {
      return Response.json(
        {
          success: false,
          error: 'Please check the submitted fields.',
        },
        { status: 400 }
      );
    }

    const workerUrl = process.env.CONTACT_WORKER_URL;

    if (!workerUrl) {
      console.error('CONTACT_WORKER_URL is missing');

      return Response.json(
        {
          success: false,
          error: 'Contact service is not configured.',
        },
        { status: 500 }
      );
    }

    const response = await fetch(workerUrl, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: String(payload.name).trim(),
        email: String(payload.email).trim(),
        subject: String(payload.subject).trim(),
        message: String(payload.message).trim(),
      }),
    });

    const result = await response.json();

    return Response.json(result, {
      status: response.status,
    });

  } catch (error) {
    console.error(
      'Contact API error:',
      error?.message || error
    );

    return Response.json(
      {
        success: false,
        error: 'Unable to send your message.',
      },
      { status: 500 }
    );
  }
}