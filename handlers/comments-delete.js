const { parseBody, writeArticles } = require("../helper");

function deleteComment(req, res, data) {
    parseBody(req, (err, body) => {
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

        writeArticles(data);  
    });
}

module.exports = { deleteComment };