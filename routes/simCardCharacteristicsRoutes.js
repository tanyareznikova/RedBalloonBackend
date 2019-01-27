var express = require('express');
var simCardCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var SimCardCharacteristics = require('../models/simCardCharacteristics.js');

/* GET ALL SimCardCharacteristics */
simCardCharacteristicsRouter.get('/', function(req, res, next) {
    SimCardCharacteristics.find(function (err, simCardCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(simCardCharacteristicsRoutes);
    });
});

/* GET SINGLE SimCardCharacteristics BY ID */
simCardCharacteristicsRouter.get('/:id', function(req, res, next) {
    SimCardCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SimCardCharacteristics */
simCardCharacteristicsRouter.post('/', function(req, res, next) {
    SimCardCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE SimCardCharacteristics */
simCardCharacteristicsRouter.put('/:id', function(req, res, next) {
    SimCardCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SimCardCharacteristics */
simCardCharacteristicsRouter.delete('/:id', function(req, res, next) {
    SimCardCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = simCardCharacteristicsRouter;