# TIA Candles Personalization Lambda

This Lambda receives the personalization form from the Amplify-hosted landing page
and sends it to email through Amazon SES.

## Environment Variables

- `FROM_EMAIL`: verified SES sender email.
- `TO_EMAIL`: email that should receive requests.
- `ALLOWED_ORIGINS`: comma-separated allowed origins, for example
  `https://main.example.amplifyapp.com,http://127.0.0.1:4173`.
  You can use `*` while testing, then restrict it to the Amplify domain.

## Frontend Connection

Deploy this function behind a Lambda Function URL or API Gateway endpoint, then paste
that URL into `src/config.js`:

```js
export const PERSONALIZATION_ENDPOINT = "https://your-aws-endpoint";
```

Run `npm run build` after changing the endpoint.

## CORS Note

The frontend sends the request as `text/plain` with a JSON body to avoid a browser
preflight request. If you enable CORS in the Lambda Function URL settings, allow:

- origin: your Amplify domain, plus `http://127.0.0.1:4173` for local testing;
- methods: `POST`, `OPTIONS`;
- headers: `content-type`.
