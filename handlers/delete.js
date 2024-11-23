const { parseBody, writeArticles, getArticleIndex } = require("../helper");

function deleteArticle(req, res, data) {
    parseBody(req, (err, body) => {
        const pos = getArticleIndex(data, body.id);
        data.splice(pos, 1);

        res.statusCode = 204;
        res.end();

        writeArticles(data);  
    });
}

module.exports = { deleteArticle };

