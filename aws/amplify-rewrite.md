# Amplify Backend Rewrite

The frontend posts personalization requests to:

```text
/api/personalization
```

To keep the real Lambda Function URL out of the browser Network tab, add an
Amplify Hosting rewrite rule:

```text
Source address: /api/personalization
Target address: https://h4helkp2ts274rh4rouvbsotau0dftik.lambda-url.eu-central-1.on.aws/
Type: 200 (Rewrite)
```

After this, the browser will show a request to:

```text
https://landing.tiacandles.com/api/personalization
```

instead of the Lambda URL.
