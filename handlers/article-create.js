const helper = require("../helper");

function createArticle(req, res, data, cb) {
    helper.parseBody(req, (err, body) => {
        if (err) {
            return cb({ code: 400, message: err.message });
        }

        if ( !helper.isValid(body.title, body.text, body.author) ) {
            return cb({ code: 400, message: "Request invalid" });
        }

        const article = {
            id: Date.now(),
            title: body.title,
            text: body.text,
            date: new Date().getDate(),
            author: body.author,
            comments: [],
        };

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(article));

        data.push(article);
        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { createArticle };
