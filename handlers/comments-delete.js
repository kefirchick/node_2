const helper = require("../helper");

function deleteComment(req, res, data) {
    helper.parseBody(req, (err, body) => {
        data.forEach((article) => {
            article.comments.forEach((comment, pos, comments) => {
                if (comment.id === body.id) {
                    comments.splice(pos, 1);

                    return;
                }
            })
        });

        res.statusCode = 204;
        res.end();

        helper.writeArticlesFile(data);
        helper.log(req.url, body);
    });
}

module.exports = { deleteComment };