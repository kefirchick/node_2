const http = require("http");
const helper = require("./helper");
const readAll = require("./handlers/readall");

const HOST = "127.0.0.1";
const PORT = 3000;

const endpointMapper = {
  "/readall": readAll,
};

const server = http.createServer(handler);

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

function handler(req, res) {
  const controller = endpointMapper[req.url];

  if (controller) {
    controller(req, res, params);
  } else {
    notFound(req, res);
  }
}

function notFound(req, res) {
  res.statusCode = 404;
  res.end("Not Found");
}
