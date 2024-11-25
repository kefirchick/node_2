const http = require("http");
const helper = require("./helper");
const handlers = require("./handlers")

const HOST = "127.0.0.1";
const PORT = 3000;
const ENDPOINT_MAPPER = {
    "/api/articles/readall": handlers.readAllArticles,
    "/api/articles/read": handlers.readArticle,
    "/api/articles/create": handlers.createArticle,
    "/api/articles/update": handlers.updateArticle,
    "/api/articles/delete": handlers.deleteArticle,
    "/api/comments/create": handlers.createComment,
    "/api/comments/delete": handlers.deleteComment
};

function startServer(data) {
    const server = http.createServer((req, res) => {
        const handler = ENDPOINT_MAPPER[req.url];
    
        if (handler) {
            handler(req, res, data);
        } else {
            handlers.notFound(req, res);
        }
    });
    
    server.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    });
}

helper.readArticlesFile((err, data) => {
    if (err) {
        throw new Error(`Can't read articles.json with the error: ${err.message}`);
    }

    startServer(data);
})
