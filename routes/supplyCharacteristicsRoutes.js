var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SupplyCharacteristics = require('../models/supplyCharacteristics.js');

/* GET ALL SupplyCharacteristics */
router.get('/', function(req, res, next) {
    SupplyCharacteristics.find(function (err, supplyCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(supplyCharacteristicsRoutes);
    });
});

/* GET SINGLE SupplyCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    SupplyCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SupplyCharacteristics */
router.post('/', function(req, res, next) {
    SupplyCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE SupplyCharacteristics */
router.put('/:id', function(req, res, next) {
    SupplyCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SupplyCharacteristics */
router.delete('/:id', function(req, res, next) {
    SupplyCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;