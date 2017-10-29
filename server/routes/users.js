const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers').users;

router.route('/register')
    .post(userCtrl.create);

router.route('/auth')
    .post(userCtrl.authenticate);

module.exports = router;