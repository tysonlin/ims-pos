const Category = require('../models').Category;
const logger = require('../log');

module.exports = {
    create: (req, res) => {
        return Category.create({
            name: req.body.name
        })
        .then(category => res.status(201).send({
            success: true,
            msg: `Category ${category.name} successfully created`,
            category: category
        }))
        .catch(err => res.status(400).send(err));
    },
    list: (req, res) => {
        return Category.all()
        .then(categories => res.status(200).json({
            success: true,
            categories: categories
        }))
        .catch(err => res.status(400).json({
            success: false,
            error: err
        }))
    }
};