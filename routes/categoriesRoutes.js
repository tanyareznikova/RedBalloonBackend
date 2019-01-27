var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category.js');

/* GET ALL Category */
router.get('/', function(req, res, next) {
    Category.find(function (err, categoriesRoutes) {
        if (err) return next(err);
        res.json(categoriesRoutes);
    });
});

/* GET SINGLE Category BY ID */
router.get('/:id', function(req, res, next) {
    Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Category */
router.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Category */
router.put('/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Category */
router.delete('/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;