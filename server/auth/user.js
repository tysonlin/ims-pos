const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models').User;

const { HttpUnauthorized, HttpNotFound } = require('../validators/errors');
const { shouldExist } = require('../validators');

const shouldExistAuthUser = (err_msg, data) => {
    return shouldExist(err_msg, data)
        .catch( err => {
           if(err instanceof HttpNotFound) throw new HttpUnauthorized(err_msg); 
        });
}

module.exports = {
    getAuthUser: (values) => {
        const username = values[0];
        const candidatePwd = values[1];

        var authUser;

        return User.findOne( { where: {username: username} } )
            .then(shouldExistAuthUser.bind(null, `Invalid Login - [${username}] not found !!!DELETE THIS AFTER DEBUG!!!`))
            .then( user => { 
                authUser = user;
                return User.comparePassword(candidatePwd, user.password); 
            })
            .then( isMatch => {
                if(!isMatch)
                    throw new HttpUnauthorized(`Invalid Login - incorrect password !!!DELETE THIS AFTER DEBUG!!!`);
                else {
                    const token = jwt.sign({data: authUser}, config.secret, {
                        expiresIn: 604800 //1 week
                    });
                    authUser.password = undefined; // scrub off password
                    authUser['token'] = `JWT ${token}`;

                    return Promise.resolve(authUser);
                }
            });
    }
};