const fs = require("fs");
const http = require("http");
const helper = require("./helper");
const { readAll } = require("./handlers/readall");
const { read } = require("./handlers/read");
const { create } = require("./handlers/create");
const { update } = require("./handlers/update");
const { deleteArticle } = require("./handlers/delete");
const { createComment } = require("./handlers/comments-create");
const { deleteComment } = require("./handlers/comments-delete");

const HOST = "127.0.0.1";
const PORT = 3000;
const ARTICLES_PATH = "./articles.json";
const endpointMapper = {
    "/api/articles/readall": readAll,
    "/api/articles/read": read,
    "/api/articles/create": create,
    "/api/articles/update": update,
    "/api/articles/delete": deleteArticle,
    "/api/comments/create": createComment,
    "/api/comments/delete": deleteComment
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
        handler(req, res, articles);
    } else {
        notFound(req, res);
    }
}

function notFound(req, res) {
    res.statusCode = 404;
    res.end("Not Found");
}
