const helper = require("../helper");

function deleteComment(req, res, data, cb) {
    helper.parseBody(req, (err, body) => {
        if (err) {
            return cb({ code: 400, message: err.message });
        }

        if (!helper.isIdValid(body.id)) {
            return cb({ code: 400, message: "Request invalid" });
        }

        const isComment = helper.deleteCommentById(data, body.id);

        if (!isComment) {
            return cb({ code: 404, message: "Not Found" });
        }

        res.statusCode = 204;
        res.end();

        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { deleteComment };
