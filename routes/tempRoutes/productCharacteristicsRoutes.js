var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductCharacteristics = require('../../models/tempModels/productCharacteristics.js');

/* GET ALL ProductCharacteristics */
router.get('/', function(req, res, next) {
    ProductCharacteristics.find(function (err, productCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(productCharacteristicsRoutes);
    });
});

/* GET SINGLE ProductCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    ProductCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ProductCharacteristics */
router.post('/', function(req, res, next) {
    ProductCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE ProductCharacteristics */
router.put('/:id', function(req, res, next) {
    ProductCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE ProductCharacteristics */
router.delete('/:id', function(req, res, next) {
    ProductCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;