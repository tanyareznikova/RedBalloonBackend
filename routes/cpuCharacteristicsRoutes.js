var express = require('express');
var cpuCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var CPUсharacteristics = require('../models/cpuCharacteristics.js');

/* GET ALL CPUсharacteristics */
cpuCharacteristicsRouter.get('/', function(req, res, next) {
    CPUсharacteristics.find(function (err, cpuCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(cpuCharacteristicsRoutes);
    });
});

/* GET SINGLE CPUсharacteristics BY ID */
cpuCharacteristicsRouter.get('/:id', function(req, res, next) {
    CPUсharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CPUсharacteristics */
productRouter.post('/', function(req, res, next) {
    CPUсharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CPUсharacteristics */
cpuCharacteristicsRouter.put('/:id', function(req, res, next) {
    CPUсharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CPUсharacteristics */
cpuCharacteristicsRouter.delete('/:id', function(req, res, next) {
    CPUсharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = cpuCharacteristicsRouter;