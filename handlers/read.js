const { parseBody } = require("../helper");

function read(req, res, data) {
    parseBody(req, (err, body) => {
        const article = data.find((item) => {
            return (item.id === body.id) ? true : false;
        })
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(article));
    })
}

module.exports = { read };
