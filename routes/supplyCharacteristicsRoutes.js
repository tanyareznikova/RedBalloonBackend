var express = require('express');
var supplyCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var SupplyCharacteristics = require('../models/supplyCharacteristics.js');

/* GET ALL SupplyCharacteristics */
supplyCharacteristicsRouter.get('/', function(req, res, next) {
    SupplyCharacteristics.find(function (err, supplyCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(supplyCharacteristicsRoutes);
    });
});

/* GET SINGLE SupplyCharacteristics BY ID */
supplyCharacteristicsRouter.get('/:id', function(req, res, next) {
    SupplyCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SupplyCharacteristics */
supplyCharacteristicsRouter.post('/', function(req, res, next) {
    SupplyCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE SupplyCharacteristics */
supplyCharacteristicsRouter.put('/:id', function(req, res, next) {
    SupplyCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SupplyCharacteristics */
supplyCharacteristicsRouter.delete('/:id', function(req, res, next) {
    SupplyCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = supplyCharacteristicsRouter;