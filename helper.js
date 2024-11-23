const fs = require("fs");

const ARTICLES_PATH = "./articles.json";
const LOG_PATH = "./log.txt";

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
        if (err) {
        }
    });
}

function getArticleIndex(data, id) {
    const index = data.findIndex((item) => {
        return item.id === id ? true : false;
    });

    return index;
}

function log(url, body) {
    const timeLine = `Time:\t${new Date()}\n`;
    const urlLine = `URL:\t${url}\n`;
    const bodyString = `Body:\n${JSON.stringify(body, null, 4)}\n`;
    const message = `${timeLine}${urlLine}${bodyString}\n`;
    
    fs.appendFile(LOG_PATH, message, (err) => {});
}

module.exports = {
    parseBody,
    writeArticles,
    getArticleIndex,
    log,
};
