import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { request as httpsRequest } from "node:https";
import { extname, join, normalize, resolve } from "node:path";

const host = "127.0.0.1";
const port = 4173;
const root = resolve(import.meta.dirname, "..");
const lambdaUrl = "https://h4helkp2ts274rh4rouvbsotau0dftik.lambda-url.eu-central-1.on.aws/";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function proxyPersonalization(req, res) {
  let body = "";
  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const upstream = httpsRequest(
      lambdaUrl,
      {
        method: "POST",
        headers: {
          "content-type": "text/plain;charset=UTF-8",
          "content-length": Buffer.byteLength(body),
          "origin": `http://${host}:${port}`,
        },
      },
      (upstreamRes) => {
        let responseBody = "";
        upstreamRes.setEncoding("utf8");
        upstreamRes.on("data", (chunk) => {
          responseBody += chunk;
        });
        upstreamRes.on("end", () => {
          send(res, upstreamRes.statusCode || 500, responseBody, {
            "content-type": upstreamRes.headers["content-type"] || "application/json; charset=utf-8",
          });
        });
      },
    );

    upstream.on("error", () => {
      send(res, 502, JSON.stringify({ message: "Could not reach personalization service" }), {
        "content-type": "application/json; charset=utf-8",
      });
    });
    upstream.end(body);
  });
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${host}:${port}`);
  const safePath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = safePath === "/" ? "index.html" : safePath.slice(1);
  const filePath = join(root, requestedPath);

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    res.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(res);
  } catch {
    send(res, 404, "Not found");
  }
}

const server = createServer((req, res) => {
  if (req.method === "POST" && ["/api/personalization", "/api/personalization/"].includes(req.url || "")) {
    proxyPersonalization(req, res);
    return;
  }

  serveStatic(req, res);
});

server.on("error", (error) => {
  console.error(`Could not start local server on http://${host}:${port}: ${error.message}`);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`TIA Candles landing: http://${host}:${port}`);
});
