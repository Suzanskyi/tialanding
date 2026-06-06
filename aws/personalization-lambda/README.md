# TIA Candles Personalization Lambda

This Lambda receives the personalization form from the Amplify-hosted landing page
and sends it to email through Amazon SES.

## Environment Variables

- `FROM_EMAIL`: verified SES sender email.
- `TO_EMAIL`: email that should receive requests.

## Frontend Connection

Deploy this function behind a Lambda Function URL or API Gateway endpoint. The
frontend posts to `/api/personalization/`, so add an Amplify Hosting rewrite from
that path to the Lambda Function URL. See `aws/amplify-rewrite.md`.

## AWS Console Test Event

For the Lambda console test button, use either this simple event:

```json
{
  "engraving": "SOFIA",
  "placement": "Кришка",
  "contact": "+380000000000",
  "language": "UK"
}
```

Or this Lambda Function URL-style event:

```json
{
  "requestContext": {
    "http": {
      "method": "POST"
    }
  },
  "headers": {
    "origin": "https://landing.tiacandles.com"
  },
  "body": "{\"engraving\":\"SOFIA\",\"placement\":\"Кришка\",\"contact\":\"+380000000000\",\"language\":\"UK\"}"
}
```

If the response is `400 Missing required fields`, the test event does not include
`engraving`, `placement`, and `contact` in a format the function received.

## CORS Note

The frontend sends the request as `text/plain` with a JSON body to avoid a browser
preflight request. The Lambda mirrors the incoming `Origin` header, so local
testing from `http://127.0.0.1:4173` and production requests can both work.

If you enable CORS in the Lambda Function URL settings, allow:

- origin: `*`, or your Amplify domain plus `http://127.0.0.1:4173`;
- methods: `POST`, `OPTIONS`;
- headers: `content-type`.
