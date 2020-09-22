const cache = {};

/**
 * Simple in-memory caching
 */
const cachingHandler = (req, res, next) => {
    const key = req.body.url;
    if (!key) {
        next();
    }

    if (cache[key]) {
        res.json(cache[key]);
    } else {
        res.jsonResponse = res.json;
        res.json = (body) => {
            cache[key] = body;
            res.jsonResponse(body);
        };
        next();
    }
};

module.exports = cachingHandler;
