const { parseBody, writeArticles, getArticleIndex } = require("../helper");

function update(req, res, data) {
    parseBody(req, (err, body) => {
        const pos = getArticleIndex(data, body.id);
        
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

        writeArticles(data);  
    });
}

module.exports = { update };

