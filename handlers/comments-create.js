const { parseBody, writeArticles, getArticleIndex } = require("../helper");

function createComment(req, res, data) {
    parseBody(req, (err, body) => {
        const pos = getArticleIndex(data, body.articleId);
        const comment = {
            id: Date.now(),
            articleId: body.articleId,
            text: body.text,
            date: new Date().getDate(),
            author: body.author,
        }

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(comment));

        data[pos].comments.push(comment);
        writeArticles(data);  
    });
}

module.exports = { createComment };