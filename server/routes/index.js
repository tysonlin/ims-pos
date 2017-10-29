const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const categoryCtrl = require('../controllers').categories;
const ingredientCtrl = require('../controllers').ingredients;
const productCtrl = require('../controllers').products;
const prodIngCtrl = require('../controllers').products_ingredients;

const PROTECTED = passport.authenticate(config.passportHeaderType, config.passportAuthOpts);

router.route('/category')
        .get(PROTECTED, categoryCtrl.list)
        .post(PROTECTED, categoryCtrl.create);

router.route('/category/:_id')
        .get(PROTECTED, categoryCtrl.retrieve)
        .put(PROTECTED, categoryCtrl.update)
        .delete(PROTECTED, categoryCtrl.delete);

router.route('/ingredient')
        .get(PROTECTED, ingredientCtrl.list)
        .post(PROTECTED, ingredientCtrl.create);

router.route('/ingredient/:_id')
        .get(PROTECTED, ingredientCtrl.retrieve)
        .put(PROTECTED, ingredientCtrl.update)
        .delete(PROTECTED, ingredientCtrl.delete);

router.route('/product')
        .get(PROTECTED, productCtrl.list)
        .post(PROTECTED, productCtrl.create);

router.route('/product/:_id')
        .get(PROTECTED, productCtrl.retrieve)
        .put(PROTECTED, productCtrl.update)
        .delete(PROTECTED, productCtrl.delete);

router.route('/product/:_id/ingredient/:Ing_id')
        .put(PROTECTED, prodIngCtrl.associate)
        .delete(PROTECTED, prodIngCtrl.dissociate);



module.exports = router;