const User = require('../models').User;

module.exports = {
    create: (req, res) => {
        return User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email
        })
        .then(user => res.status(201).json({
            success: true,
            user: {
                username: user.username,
                name: user.name,
                email: user.email
            }
        }))
        .catch(err => res.status(400).send(err));
    }
};