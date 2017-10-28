const Ingredient = require('../models').Ingredient;
const { successResponse, failureResponse } = require('../handler');
const { checkNotFound } = require('../validator');
const { validateIngredientInput } = require('../validator/ingredient');

module.exports = {
    create: (req, res, next) => {
        return validateIngredientInput([req.body.name, req.body.unitPrice, req.body.stock])
        .then( (values) => Ingredient.create({
            name: values[0],
            unitPrice: values[1],
            stock: values[2]
        }))
        .then(successResponse.bind(null, res, 201, `Ingredient ${req.body.name} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    list: (req, res, next) => {
        return Ingredient.findAll({ order: [ 'name' ], include: [ 'Product' ]})
        .then(successResponse.bind(null, res, 201, 'Get all ingredients successful'))
        .catch(failureResponse.bind(null, res));
    },
    retrieve: (req, res, next) => {
        return Ingredient.findById(req.params._id, {include: [ 'Product' ]})
        .then(checkNotFound.bind(null, `Retrive ingredient id [${req.params._id}] not found`))
        .then(successResponse.bind(null, res, 200, `Retrive ingredient id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    update: (req, res, next) => {
        return validateIngredientInput([req.body.name, req.body.unitPrice, req.body.stock])
        .then(values => { return Ingredient.findById(req.params._id); })
        .then(checkNotFound.bind(null, `Update ingredient id [${req.params._id}] not found`))
        .then(ingredient => { 
            return ingredient.update( 
                { 
                    name: req.body.name || ingredient.name,
                    unitPrice: req.body.unitPrice || ingredient.unitPrice,
                    stock: req.body.stock || ingredient.stock
                }
            );
        })
        .then(successResponse.bind(null, res, 200, `Update ingredient id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    delete: (req, res, next) => {
        return Ingredient.findById(req.params._id)
        .then(checkNotFound.bind(null, `Delete ingredient id [${req.params._id}] not found`))
        .then(ingredient => {
            return ingredient.destroy();
        })
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res));
    },
};