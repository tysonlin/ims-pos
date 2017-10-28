const logger = require('../log');
const env = process.env.NODE_ENV || 'development';

module.exports = {
    successResponse: (res, status, msg, data) => {
        if(status == 204)
            return res.status(status).send();
        const json = {
            success: true,
            message: msg
        };
        json['data'] = data;
        return res.status(status).json(json);
    },
    failureResponse: (res, err) => {
        logger.error(err);
        const status = err.code || 500;
        const json = {
            success: false,
            message: err.message,
        };
        if(env === 'development'){
            json['error'] =  err;
        }
        return res.status(status).json(json);
    }
};