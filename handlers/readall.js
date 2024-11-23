function readAll(req, res, data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

module.exports = { readAll };
