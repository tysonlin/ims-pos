const { Product, Ingredient, Category } = require('../models');

const { successResponse, failureResponse } = require('../handler');
const { checkNotFound, validateIdInput } = require('../validator');
const { validateProductInput } = require('../validator/product');

const logger = require('../log');

module.exports = {
    create: (req, res, next) => {
        return validateProductInput([req.body.name, req.body.price, req.body.Category_id])
        .then( values => { return Category.findById(values[2]); })
        .then(checkNotFound.bind(null, `Create Product - Category id [${req.body.Category_id}] not found`))
        .then( category => Product.create({
            name: req.body.name,
            price: req.body.price,
            Category_id: req.body.Category_id
        }))
        .then(successResponse.bind(null, res, 201, `Product ${req.body.name} successfully created`))
        .catch(failureResponse.bind(null, res));
    },
    list: (req, res, next) => {
        return Product.findAll({ order: [ 'name' ], include: ['Category', 'Ingredient']})
        .then(successResponse.bind(null, res, 201, 'Get all products successful'))
        .catch(failureResponse.bind(null, res));
    },
    retrieve: (req, res, next) => {
        return validateIdInput([req.params._id])
        .then( values => { return Product.findById(values[0], {include: ['Category', 'Ingredient']}); })
        .then(checkNotFound.bind(null, `Retrive product id [${req.params._id}] not found`))
        .then(successResponse.bind(null, res, 200, `Retrive product id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    update: (req, res, next) => {
        return validateProductInput([req.body.name, req.body.price, req.body.Category_id])
        .then( values => { return Category.findById(values[2]); })
        .then(checkNotFound.bind(null, `Update Product - Category id [${req.body.Category_id}] not found`))
        .then(values => { return Product.findById(req.params._id); })
        .then(checkNotFound.bind(null, `Update product id [${req.params._id}] not found`))
        .then(product => { 
            return product.update( 
                { 
                    name: req.body.name || Product.name,
                    price: req.body.price || Product.price,
                    Category_id: req.body.Category_id || product.Category_id
                }
            );
        })
        .then(successResponse.bind(null, res, 200, `Update product id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    delete: (req, res, next) => {
        return validateIdInput([req.params._id])
        .then( values => { return Product.findById(req.params._id); } )
        .then(checkNotFound.bind(null, `Delete product id [${req.params._id}] not found`))
        .then(product => {
            return product.destroy();
        })
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res));
    },
    putIngredient: (req, res, next) => {
        return validateIdInput([req.params._id, req.params.Ing_id])
        .then( values => { return Ingredient.findById(req.params.Ing_id); } )
        .then(checkNotFound.bind(null, `Put ingredient - ingredient id [${req.params.Ing_id}] not found`))
        .then( values => { return Product.findById(req.params._id); } )
        .then(checkNotFound.bind(null, `Put ingredient - product id [${req.params._id}] not found`))
        .then( product => { product.addIngredient(req.params.Ing_id) } )
        .then(successResponse.bind(null, res, 200, ''))
        .catch(failureResponse.bind(null, res));
    }
};