const helper = require("../helper");

function updateArticle(req, res, data) {
    helper.parseBody(req, (err, body) => {
        const pos = helper.getArticleIndex(data, body.id);
        
        if (body.title) {
            data[pos].title = body.title;
        }

        if (body.text) {
            data[pos].text = body.text;
        }

        if (body.author) {
            data[pos].author = body.author;
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data[pos]));

        helper.writeArticles(data);
        helper.log(req.url, body);
    });
}

module.exports = { updateArticle };

