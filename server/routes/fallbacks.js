const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const { failureResponse } = require('../handlers');
const { HttpUnauthorized } = require('../validators/errors');

const routeNameParser = require('../log/route-name-parser');

const PROTECTED = passport.authenticate(config.passportHeaderType, config.passportAuthOpts);

router.route('/unauthorized')
        .get( (req, res, next) => {
            return new Promise( resolve => {
                throw new HttpUnauthorized(`You do not have proper authorization to access this route. Please use /user/auth to get access token, or /user/register to register new account`);
            })
            .catch(failureResponse.bind(null, res));
        });

module.exports = (ApiRoutes) => {
    router.route('*')
        .get(PROTECTED, (req, res) => res.status(200).json({
            msg: 'Welcome. Please refer to /api/<routes>, where <routes> are the following to access functionalities',
            routes: routeNameParser.listAllJson(ApiRoutes.stack)
        }));

    return router;
};

