var express = require('express');
var categoryRouter = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category.js');

/* GET ALL PRODUCTS */
categoryRouter.get('/', function(req, res, next) {
    Category.find(function (err, categoriesRoutes) {
        if (err) return next(err);
        res.json(categoriesRoutes);
    });
});

/* GET SINGLE PRODUCT BY ID */
categoryRouter.get('/:id', function(req, res, next) {
    Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE PRODUCT */
categoryRouter.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE PRODUCT */
categoryRouter.put('/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE PRODUCT */
categoryRouter.delete('/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = categoryRouter;