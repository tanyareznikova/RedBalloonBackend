var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var WhereCanOneBuy = require('../models/whereCanOneBuy.js');

/* GET ALL WhereCanOneBuy */
router.get('/', function(req, res, next) {
    WhereCanOneBuy.find(function (err, whereCanOneBuyRoutes) {
        if (err) return next(err);
        res.json(whereCanOneBuyRoutes);
    });
});

/* GET SINGLE WhereCanOneBuy BY ID */
router.get('/:id', function(req, res, next) {
    WhereCanOneBuy.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE WhereCanOneBuy */
router.post('/', function(req, res, next) {
    WhereCanOneBuy.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE WhereCanOneBuy */
router.put('/:id', function(req, res, next) {
    WhereCanOneBuy.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE WhereCanOneBuy */
router.delete('/:id', function(req, res, next) {
    WhereCanOneBuy.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;