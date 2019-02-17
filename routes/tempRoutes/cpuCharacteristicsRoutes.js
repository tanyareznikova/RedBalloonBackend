var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CpuCharacteristics = require('../../models/tempModels/cpuCharacteristics.js');

/* GET ALL CPUсharacteristics */
router.get('/', function(req, res, next) {
    CpuCharacteristics.find(function (err, cpuCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(cpuCharacteristicsRoutes);
    });
});

/* GET SINGLE CPUсharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    CpuCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CPUсharacteristics */
router.post('/', function(req, res, next) {
    CpuCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CPUсharacteristics */
router.put('/:id', function(req, res, next) {
    CpuCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CPUсharacteristics */
router.delete('/:id', function(req, res, next) {
    CpuCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;