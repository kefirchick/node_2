const helper = require("../helper");

function updateArticle(req, res, data, cb) {
    helper.parseBody(req, (err, body) => {
        if (err) {
            return cb({ code: 400, message: err.message });
        }

        if (
            !helper.isValid(body.title, body.text, body.author) ||
            !helper.isIdValid(body.id)
        ) {
            return cb({ code: 400, message: "Request invalid" });
        }

        const pos = helper.getArticleIndex(data, body.id);

        if (pos === -1) {
            return cb({ code: 404, message: "Not Found" });
        }

        data[pos].title = body.title;
        data[pos].text = body.text;
        data[pos].author = body.author;

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data[pos]));

        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { updateArticle };
