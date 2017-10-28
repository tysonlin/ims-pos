const Category = require('../models').Category;
const { successResponse, failureResponse } = require('../handlers');
const { checkNotFound } = require('../handlers/validator')

module.exports = {
    create: (req, res, next) => {
        return Category.create({
            name: req.body.name
        })
        .then(successResponse.bind(null, res, 201, `Category ${req.body.name} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    list: (req, res, next) => {
        return Category.all()
        .then(checkNotFound.bind(null))
        .then(successResponse.bind(null, res, 201, 'Get all category successful'))
        .catch(failureResponse.bind(null, res));
    },
    retrieve: (req, res, next) => {
        return Category.findById(req.params._id)
        .then(checkNotFound.bind(null))
        .then(successResponse.bind(null, res, 200, `Retrive category id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    update: (req, res, next) => {
        return Category.findById(req.params._id)
        .then(checkNotFound.bind(null))
        .catch(failureResponse.bind(null, res))
        .then(category => { 
            return category.update( 
                { name: req.body.name || category.name }
            );
        })
        .then(successResponse.bind(null, res, 200, `Update category id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    delete: (req, res, next) => {
        Category.findById(req.params._id)
        .then(checkNotFound.bind(null))
        .catch(failureResponse.bind(null, res))
        .then(category => {
            return category.destroy();
        })
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res))
    },
};