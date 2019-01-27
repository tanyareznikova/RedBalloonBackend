var express = require('express');
var productCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var ProductCharacteristics = require('../models/productCharacteristics.js');

/* GET ALL ProductCharacteristics */
productCharacteristicsRouter.get('/', function(req, res, next) {
    ProductCharacteristics.find(function (err, productCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(productCharacteristicsRoutes);
    });
});

/* GET SINGLE ProductCharacteristics BY ID */
productCharacteristicsRouter.get('/:id', function(req, res, next) {
    ProductCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ProductCharacteristics */
productCharacteristicsRouter.post('/', function(req, res, next) {
    ProductCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE ProductCharacteristics */
productCharacteristicsRouter.put('/:id', function(req, res, next) {
    ProductCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE ProductCharacteristics */
productCharacteristicsRouter.delete('/:id', function(req, res, next) {
    ProductCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = productCharacteristicsRouter;