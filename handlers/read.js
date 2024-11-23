const { parseBody, getArticleIndex } = require("../helper");

function read(req, res, data) {
    parseBody(req, (err, body) => {
        const pos = getArticleIndex(data, body.id);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data[pos]));
    })
}

module.exports = { read };
