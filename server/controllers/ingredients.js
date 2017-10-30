const { Ingredient, Product_Ingredient, Product } = require('../models');

const { successResponse, failureResponse } = require('../handlers');
const { shouldExist } = require('../validators');
const { validateIngredientInput } = require('../validators/ingredient');

module.exports = {
    create: (req, res, next) => {
        return validateIngredientInput([req.body.name, req.body.unitPrice, req.body.stock])
        .then( (values) => Ingredient.create({
                name: values[0],
                unitPrice: values[1],
                stock: values[2]
            })
        )
        .then(successResponse.bind(null, res, 201, `Ingredient ${req.body.name} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    list: (req, res, next) => {
        return Ingredient.findAll({ order: [ 'name' ], include: [ { model: Product_Ingredient, include: [Product] } ]})
        .then(successResponse.bind(null, res, 200, 'Get all ingredients successful'))
        .catch(failureResponse.bind(null, res));
    },
    retrieve: (req, res, next) => {
        return Ingredient.findById(req.params._id, {include: [ { model: Product_Ingredient, include: [Product] } ]})
        .then(shouldExist.bind(null, `Retrive ingredient id [${req.params._id}] not found`))
        .then(successResponse.bind(null, res, 200, `Retrive ingredient id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    update: (req, res, next) => {
        return validateIngredientInput([req.body.name, req.body.unitPrice, req.body.stock])
        .then(values => { return Ingredient.findById(req.params._id); })
        .then(shouldExist.bind(null, `Update ingredient id [${req.params._id}] not found`))
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
        .then(shouldExist.bind(null, `Delete ingredient id [${req.params._id}] not found`))
        .then(ingredient => {
            return ingredient.destroy();
        })
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res));
    },
};