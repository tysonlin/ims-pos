const User = require('../models').User;
const { successResponse, failureResponse } = require('../handlers');
const { shouldNotExist } = require('../validators');
const { validateUserInput, validateUserLogin } = require('../validators/user');
const { getAuthUser } = require('../auth/user');


module.exports = {
    create: (req, res, next) => {
        const input = [req.body.username, req.body.password, req.body.name, req.body.email];
        return validateUserInput(input)
        .then( values => { return User.findAll({ where: { username: values[0]} }); } )
        .then(shouldNotExist.bind(null, `Create user - username [${req.body.username}] is already taken`))
        .then( empty => { return User.addUser(input) })
        .then(successResponse.bind(null, res, 201, `Username ${req.body.username} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    authenticate: (req, res, next) => {
        const input = [req.body.username, req.body.password];
        return validateUserLogin(input)
        .then( values => { return getAuthUser(values); } )
        .then(successResponse.bind(null, res, 200, `Login user ${req.body.username} successful`))
        .catch(failureResponse.bind(null, res));
    }
};