const helper = require("../helper");

function readAllArticles(req, res, data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));

    helper.log(req.url, "");
}

module.exports = { readAllArticles };
