var express = require('express');
var categoryRouter = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category.js');

/* GET ALL Category */
categoryRouter.get('/', function(req, res, next) {
    Category.find(function (err, categoriesRoutes) {
        if (err) return next(err);
        res.json(categoriesRoutes);
    });
});

/* GET SINGLE Category BY ID */
categoryRouter.get('/:id', function(req, res, next) {
    Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Category */
categoryRouter.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Category */
categoryRouter.put('/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Category */
categoryRouter.delete('/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = categoryRouter;