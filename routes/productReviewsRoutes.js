var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductReviews = require('../models/productReviews.js');

/* GET ALL ProductReviews */
router.get('/', function(req, res, next) {
    ProductReviews.find(function (err, productReviewsRoutes) {
        if (err) return next(err);
        res.json(productReviewsRoutes);
    });
});

/* GET SINGLE ProductReviews BY ID */
router.get('/:id', function(req, res, next) {
    ProductReviews.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ProductReviews */
router.post('/', function(req, res, next) {
    ProductReviews.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE ProductReviews */
router.put('/:id', function(req, res, next) {
    ProductReviews.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE ProductReviews */
router.delete('/:id', function(req, res, next) {
    ProductReviews.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;