var express = require('express');
var productReviewsRouter = express.Router();
var mongoose = require('mongoose');
var ProductReviews = require('../models/productReviews.js');

/* GET ALL ProductReviews */
productReviewsRouter.get('/', function(req, res, next) {
    ProductReviews.find(function (err, productReviewsRoutes) {
        if (err) return next(err);
        res.json(productReviewsRoutes);
    });
});

/* GET SINGLE ProductReviews BY ID */
productReviewsRouter.get('/:id', function(req, res, next) {
    ProductReviews.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ProductReviews */
productReviewsRouter.post('/', function(req, res, next) {
    ProductReviews.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE ProductReviews */
productReviewsRouter.put('/:id', function(req, res, next) {
    ProductReviews.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE ProductReviews */
productReviewsRouter.delete('/:id', function(req, res, next) {
    ProductReviews.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = productReviewsRouter;