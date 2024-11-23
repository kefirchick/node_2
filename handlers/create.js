const { parseBody, writeArticles } = require("../helper");

const ARTICLES_PATH = "./articles.json";

function create(req, res, data) {
    parseBody(req, (err, body) => {
        const article = {
            id: Date.now(),
            title: body.title,
            text: body.text,
            date: new Date().getDate(),
            author: body.author,
            comments: []
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(article));

        data.push(article);
        writeArticles(data);  
    });
}


module.exports = { create };

