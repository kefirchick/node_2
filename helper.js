const fs = require("fs");

const ARTICLES_PATH = "./articles.json";

function parseBody(req, cb) {
    let body = [];

    req.on("data", (chunk) => {
        body.push(chunk);
    }).on("end", () => {
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        cb(null, body);
    });
}

function writeArticles(data) {
    const dataString = JSON.stringify(data, null, 4);
    fs.writeFile(ARTICLES_PATH, dataString, (err) => {
        
    });
}

function getArticleIndex(data, id) {
    const index = data.findIndex((item) => {
        return (item.id === id) ? true : false;
    })

    return index;
}

module.exports = {
    parseBody,
    writeArticles,
    getArticleIndex
}