const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers').users;
const categoryCtrl = require('../controllers').categories;

router.route('/register')
        .post(userCtrl.create);

router.route('/category')
        .get(categoryCtrl.list)
        .post(categoryCtrl.create);

router.route('').get((req, res) => res.status(200).send({
    msg: "Welcome to the API",
}));

module.exports = router;