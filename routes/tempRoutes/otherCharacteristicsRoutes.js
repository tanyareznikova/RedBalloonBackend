var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var OtherCharacteristics = require('../../models/tempModels/otherCharacteristics.js');

/* GET ALL OtherCharacteristics */
router.get('/', function(req, res, next) {
    OtherCharacteristics.find(function (err, otherCharacteristicsRouterRoutes) {
        if (err) return next(err);
        res.json(otherCharacteristicsRouterRoutes);
    });
});

/* GET SINGLE OtherCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    OtherCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE OtherCharacteristics */
router.post('/', function(req, res, next) {
    OtherCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE OtherCharacteristics */
router.put('/:id', function(req, res, next) {
    OtherCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE OtherCharacteristics */
router.delete('/:id', function(req, res, next) {
    OtherCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;