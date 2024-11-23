const helper = require("../helper");

function readArticle(req, res, data) {
    helper.parseBody(req, (err, body) => {
        const pos = helper.getArticleIndex(data, body.id);
        
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data[pos]));

        helper.log(req.url, body);
    })
}

module.exports = { readArticle };
