const helper = require("../helper");

function deleteArticle(req, res, data, cb) {
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

        data.splice(pos, 1);

        res.statusCode = 204;
        res.end();

        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { deleteArticle };
