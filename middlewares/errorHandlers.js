const APIError = require('../classes/APIError');

const defaultErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.json({ status: 'fail', err })
};

const apiErrorHandler = (err, req, res, next) => {
    if (!err instanceof APIError) {
        return next(err);
    }
    res.status(err.statusCode);
    res.json({ status: 'fail', err: err.message });
};

module.exports = {
    defaultErrorHandler,
    apiErrorHandler,
};
