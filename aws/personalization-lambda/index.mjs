import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});

function getCorsHeaders(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";

  return {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Origin": origin || "*",
    "Vary": "Origin",
  };
}

function response(event, statusCode, body) {
  return {
    statusCode,
    headers: getCorsHeaders(event),
    body: JSON.stringify(body),
  };
}

function parseRequestData(event) {
  if (event.body) {
    const body = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
    return JSON.parse(body);
  }

  return event;
}

export async function handler(event) {
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return response(event, 204, {});
  }

  try {
    const data = parseRequestData(event);
    const engraving = String(data.engraving || "").trim().slice(0, 10);
    const placement = String(data.placement || "").trim();
    const contact = String(data.contact || "").trim();
    const language = String(data.language || "").trim();

    if (!engraving || !placement || !contact) {
      return response(event, 400, { message: "Missing required fields" });
    }

    const subject = `TIA Candles personalization: ${engraving}`;
    const text = [
      "New TIA Candles personalization request",
      "",
      `Engraving: ${engraving}`,
      `Placement: ${placement}`,
      `Contact: ${contact}`,
      `Language: ${language}`,
      `Source: ${data.source || "TIA Candles landing"}`,
      `Created at: ${data.createdAt || new Date().toISOString()}`,
    ].join("\n");

    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.FROM_EMAIL,
        Destination: {
          ToAddresses: [process.env.TO_EMAIL],
        },
        Content: {
          Simple: {
            Subject: { Data: subject },
            Body: {
              Text: { Data: text },
            },
          },
        },
      }),
    );

    return response(event, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return response(event, 500, { message: "Could not send request" });
  }
}
