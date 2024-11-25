const helper = require("../helper");

function createComment(req, res, data, cb) {
    helper.parseBody(req, (err, body) => {
        if (err) {
            return cb({ code: 400, message: err.message });
        }

        if (
            !helper.isValid(body.text, body.author) ||
            !helper.isIdValid(body.articleId)
        ) {
            return cb({ code: 400, message: "Request invalid" });
        }

        const pos = helper.getArticleIndex(data, body.articleId);

        if (pos === -1) {
            return cb({ code: 404, message: "Not Found" });
        }

        const comment = {
            id: Date.now(),
            articleId: body.articleId,
            text: body.text,
            date: new Date().getDate(),
            author: body.author,
        };

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(comment));

        data[pos].comments.push(comment);
        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { createComment };
