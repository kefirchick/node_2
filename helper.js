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

module.exports = { parseBody }