var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SimCardCharacteristics = require('../../models/tempModels/simCardCharacteristics.js');

/* GET ALL SimCardCharacteristics */
router.get('/', function(req, res, next) {
    SimCardCharacteristics.find(function (err, simCardCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(simCardCharacteristicsRoutes);
    });
});

/* GET SINGLE SimCardCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    SimCardCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE SimCardCharacteristics */
router.post('/', function(req, res, next) {
    SimCardCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE SimCardCharacteristics */
router.put('/:id', function(req, res, next) {
    SimCardCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE SimCardCharacteristics */
router.delete('/:id', function(req, res, next) {
    SimCardCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;