const http = require("http");

const HOST = "127.0.0.1";
const PORT = 3000;
const HANDLERS = {
  "/sum": sum,
};

const server = http.createServer((request, response) => {
  parseBodyJson(request, (error, payload) => {
    const handler = getHandler(request.url);

    handler(request, response, payload, (error, result) => {
      if (error) {
        response.statusCode = error.code;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(error));

        return;
      }

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(result));
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

function getHandler(url) {
  return HANDLERS[url] || notFound;
}

function sum(request, response, payload, cb) {
  const result = { c: payload.a + payload.b };

  cb(null, result);
}

function notFound(request, response, payload, cb) {
  cb({ code: 404, message: "Not found" });
}

function parseBodyJson(request, cb) {
  let body = [];

  request
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      let params = JSON.parse(body);
      cb(null, params);
    });
}
