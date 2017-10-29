const { failureResponse } = require('../handlers');

module.exports = {
    unhandledExceptionsHandler: (err, req, res, next) => {
        failureResponse(res, err);
    }
};