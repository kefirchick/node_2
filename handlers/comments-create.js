const helper = require("../helper");

function createComment(req, res, data) {
    helper.parseBody(req, (err, body) => {
        const pos = helper.getArticleIndex(data, body.articleId);
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
        helper.writeArticles(data);
        helper.log(req.url, body); 
    });
}

module.exports = { createComment };