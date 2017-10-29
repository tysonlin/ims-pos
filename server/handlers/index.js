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
        if(data.token){
            json['token'] = data.token;
            data.token = undefined; // << doesn't make a diff - token doesn't show in data eventhough not scrub
        }
        if(data.password){ // scrub off password field if there is one
            data.password = undefined;
        }
        json['data'] = data;
        return res.status(status).json(json);
    },
    failureResponse: (res, err) => {
        logger.error(err);
        const status = err.code || err.status || 500;
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