const helper = require("../helper");

function deleteArticle(req, res, data) {
    helper.parseBody(req, (err, body) => {
        const pos = helper.getArticleIndex(data, body.id);
        data.splice(pos, 1);

        res.statusCode = 204;
        res.end();

        helper.writeArticles(data);
        helper.log(req.url, body); 
    });
}

module.exports = { deleteArticle };

