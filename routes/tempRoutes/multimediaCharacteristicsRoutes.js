var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MultimediaCharacteristics = require('../models/tempModels/multimediaCharacteristics.js');

/* GET ALL MultimediaCharacteristics */
router.get('/', function(req, res, next) {
    MultimediaCharacteristics.find(function (err, multimediaCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(multimediaCharacteristicsRoutes);
    });
});

/* GET SINGLE MultimediaCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    MultimediaCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE MultimediaCharacteristics */
router.post('/', function(req, res, next) {
    MultimediaCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE MultimediaCharacteristics */
router.put('/:id', function(req, res, next) {
    MultimediaCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE MultimediaCharacteristics */
router.delete('/:id', function(req, res, next) {
    MultimediaCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;