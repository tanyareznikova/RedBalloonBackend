var express = require('express');
var displayCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var DisplayCharacteristics = require('../models/displayCharacteristics.js');

/* GET ALL DisplayCharacteristics */
displayCharacteristicsRouter.get('/', function(req, res, next) {
    DisplayCharacteristics.find(function (err, displayCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(displayCharacteristicsRoutes);
    });
});

/* GET SINGLE DisplayCharacteristics BY ID */
displayCharacteristicsRouter.get('/:id', function(req, res, next) {
    DisplayCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE DisplayCharacteristics */
displayCharacteristicsRouter.post('/', function(req, res, next) {
    DisplayCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE DisplayCharacteristics */
displayCharacteristicsRouter.put('/:id', function(req, res, next) {
    DisplayCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE DisplayCharacteristics */
displayCharacteristicsRouter.delete('/:id', function(req, res, next) {
    DisplayCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = displayCharacteristicsRouter;