const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers').users;
const categoryCtrl = require('../controllers').categories;
const ingredientCtrl = require('../controllers').ingredients;
const productCtrl = require('../controllers').products;
const prodIngCtrl = require('../controllers').products_ingredients;

router.route('/register')
        .post(userCtrl.create);

router.route('/category')
        .get(categoryCtrl.list)
        .post(categoryCtrl.create);

router.route('/category/:_id')
        .get(categoryCtrl.retrieve)
        .put(categoryCtrl.update)
        .delete(categoryCtrl.delete);

router.route('/ingredient')
        .get(ingredientCtrl.list)
        .post(ingredientCtrl.create);

router.route('/ingredient/:_id')
        .get(ingredientCtrl.retrieve)
        .put(ingredientCtrl.update)
        .delete(ingredientCtrl.delete);

router.route('/product')
        .get(productCtrl.list)
        .post(productCtrl.create);

router.route('/product/:_id')
        .get(productCtrl.retrieve)
        .put(productCtrl.update)
        .delete(productCtrl.delete);

router.route('/product/:_id/ingredients/:Ing_id')
        .put(prodIngCtrl.associate)
        .delete(prodIngCtrl.dissociate);



module.exports = router;