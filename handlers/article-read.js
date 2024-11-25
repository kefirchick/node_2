const helper = require("../helper");

function readArticle(req, res, data, cb) {
    helper.parseBody(req, (err, body) => {
        if (err) {
            return cb({ code: 400, message: err.message });
        }

        if (!helper.isIdValid(body.id)) {
            return cb({ code: 400, message: "Request invalid" });
        }

        const pos = helper.getArticleIndex(data, body.id);

        if (pos === -1) {
            return cb({ code: 404, message: "Not Found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data[pos]));

        helper.log(req.url, body);
    });
}

module.exports = { readArticle };
