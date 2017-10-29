const { Product, Ingredient, Product_Ingredient } = require('../models');

const { successResponse, failureResponse } = require('../handlers');
const { shouldExist, shouldNotExist, shouldBeValidIds } = require('../validators');
const { validateProductInput } = require('../validators/product');

module.exports = {
    associate: (req, res, next) => {
        return shouldBeValidIds([req.params._id, req.params.Ing_id])
        .then( values => { return Ingredient.findById(req.params.Ing_id); } )
        .then(shouldExist.bind(null, `Associate ingredient to product - ingredient id [${req.params.Ing_id}] not found`))
        .then( values => { return Product.findById(req.params._id); } )
        .then(shouldExist.bind(null, `Associate ingredient to product - product id [${req.params._id}] not found`))
        .then( product => { return Product_Ingredient.findAll({
             where: {
                Product_id: req.params._id,
                Ingredient_id: req.params.Ing_id
             } 
            });
        })
        .then(shouldNotExist.bind(null, `Associate ingredient to product - product id [${req.params._id}] already has ingredient id [${req.params.Ing_id}]`))
        .then( product => { return Product_Ingredient.create({
                Product_id: req.params._id,
                Ingredient_id: req.params.Ing_id
            });
        })
        .then(successResponse.bind(null, res, 200, `Associate ingredient id [${req.params.Ing_id}] to product id [${req.params._id}] successful`))
        .catch(failureResponse.bind(null, res));
    },
    dissociate: (req, res, next) => {
        return shouldBeValidIds([req.params._id, req.params.Ing_id])
        .then( values => { return Product_Ingredient.findAll({
            where: {
               Product_id: req.params._id,
               Ingredient_id: req.params.Ing_id
            } 
           });
        })
        .then(shouldExist.bind(null, `Dissociate ingredient to product - association does not exist between product id [${req.params._id}] and ingredient id [${req.params.Ing_id}]`))
        .then( associations => { return associations.forEach( association => association.destroy() ); } )
        .then(successResponse.bind(null, res, 204, ''))
        .catch(failureResponse.bind(null, res));
    }
};