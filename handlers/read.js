const { parseBody } = require("../helper");

function read(req, res, data) {
    parseBody(req, (err, body) => {
        const article = data.find((item) => {
            return (item.id === body.id) ? true : false;
        })
        console.log(body, data, article);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(article));
    })
}

module.exports = { read };
