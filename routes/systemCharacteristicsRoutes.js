var express = require('express');
var systemCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var SystemCharacteristics = require('../models/systemCharacteristics.js');

/* GET ALL SystemCharacteristics */
systemCharacteristicsRouter.get('/', function(req, res, next) {
    SystemCharacteristics.find(function (err, systemCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(systemCharacteristicsRoutes);
    });
});

/* GET SINGLE SystemCharacteristics BY ID */
systemCharacteristicsRouter.get('/:id', function(req, res, next) {
    SystemCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SystemCharacteristics */
systemCharacteristicsRouter.post('/', function(req, res, next) {
    SystemCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE SystemCharacteristics */
systemCharacteristicsRouter.put('/:id', function(req, res, next) {
    SystemCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SystemCharacteristics */
systemCharacteristicsRouter.delete('/:id', function(req, res, next) {
    SystemCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = systemCharacteristicsRouter;