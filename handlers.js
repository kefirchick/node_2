const { readAllArticles } = require("./handlers/article-readall");
const { readArticle } = require("./handlers/article-read");
const { createArticle } = require("./handlers/article-create");
const { updateArticle } = require("./handlers/article-update");
const { deleteArticle } = require("./handlers/article-delete");
const { createComment } = require("./handlers/comments-create");
const { deleteComment } = require("./handlers/comments-delete");

function error(req, res, err) {
    res.statusCode = err.code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
}

module.exports = {
    readAllArticles,
    readArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    createComment,
    deleteComment,
    error
};