const fs = require("fs");
const http = require("http");
const helper = require("./helper");
const { readAll } = require("./handlers/readall");

const HOST = "127.0.0.1";
const PORT = 3000;
const ARTICLES_PATH = "./articles.json";
const endpointMapper = {
    "/readall": readAll,
};
let articles = null;

fs.readFile(ARTICLES_PATH, fsHandler);

function fsHandler(err, data) {
    articles = JSON.parse(data);
    startServer();
}

function startServer() {
    const server = http.createServer(httpHandler);
    server.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    });
}

function httpHandler(req, res) {
    const handler = endpointMapper[req.url];

    if (handler) {
        console.log(handler, typeof handler);
        handler(req, res, articles);
    } else {
        notFound(req, res);
    }
}

function notFound(req, res) {
    res.statusCode = 404;
    res.end("Not Found");
}
