const Category = require('../models').Category;
const { successResponse, failureResponse } = require('../handlers');
const { shouldExist, shouldBeValidStrings, shouldBeValidIds } = require('../validators')

module.exports = {
    create: (req, res, next) => {
        return shouldBeValidStrings("Parameter 'name' is empty, or contain illegal characters", [req.body.name])
        .then( (values) => { return Category.create( { name: values[0] } ) })
        .then(successResponse.bind(null, res, 201, `Category ${req.body.name} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    list: (req, res, next) => {
        return Category.findAll({ order: [ 'name' ]})
        .then(successResponse.bind(null, res, 201, 'Get all category successful'))
        .catch(failureResponse.bind(null, res));
    },
    retrieve: (req, res, next) => {
        return shouldBeValidIds([req.params._id])
        .then( values => { return Category.findById(req.params._id); })
        .then(shouldExist.bind(null, `Retrive category id [${req.params._id}] not found`))
        .then(successResponse.bind(null, res, 200, `Retrive category id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    update: (req, res, next) => {
        return shouldBeValidStrings("Parameter 'name' is empty, or contain illegal characters", [req.body.name])
        .then(values => { return Category.findById(req.params._id); })
        .then(shouldExist.bind(null, `Update category id [${req.params._id}] not found`))
        .then(category => { 
            return category.update( 
                { name: req.body.name || category.name }
            );
        })
        .then(successResponse.bind(null, res, 200, `Update category id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    delete: (req, res, next) => {
        return shouldBeValidIds([req.params._id])
        .then( values => { return Category.findById(req.params._id); } )
        .then(shouldExist.bind(null, `Delete category id [${req.params._id}] not found`))
        .then(category => {
            return category.destroy();
        })
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res));
    },
};