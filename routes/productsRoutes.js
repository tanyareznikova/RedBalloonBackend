var express = require('express');
var productRouter = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js');

/* GET ALL PRODUCTS */
productRouter.get('/', function(req, res, next) {
    Product.find(function (err, productsRoutes) {
        if (err) return next(err);
        res.json(productsRoutes);
    });
});

/* GET SINGLE PRODUCT BY ID */
productRouter.get('/:id', function(req, res, next) {
    Product.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE PRODUCT */
productRouter.post('/', function(req, res, next) {
    Product.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE PRODUCT */
productRouter.put('/:id', function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE PRODUCT */
productRouter.delete('/:id', function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = productRouter;