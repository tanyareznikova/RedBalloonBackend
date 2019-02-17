var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DisplayCharacteristics = require('../models/tempModels/displayCharacteristics.js');

/* GET ALL DisplayCharacteristics */
router.get('/', function(req, res, next) {
    DisplayCharacteristics.find(function (err, displayCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(displayCharacteristicsRoutes);
    });
});

/* GET SINGLE DisplayCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    DisplayCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE DisplayCharacteristics */
router.post('/', function(req, res, next) {
    DisplayCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE DisplayCharacteristics */
router.put('/:id', function(req, res, next) {
    DisplayCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE DisplayCharacteristics */
router.delete('/:id', function(req, res, next) {
    DisplayCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;