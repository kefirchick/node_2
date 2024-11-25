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
            handler(req, res, data, (err) => {
                if (err) {
                    handlers.error(req, res, err);
                }
            });
        } else {
            handlers.error(req, res, {code: 404, message: "Not Found"});
        }
    });
    
    server.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    });
}

helper.readArticlesFile((err, data) => {
    if (err) {
        throw new Error(`Error reading articles.json with the message:\n${err.message}`);
    }

    startServer(data);
})
