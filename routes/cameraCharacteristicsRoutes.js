var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CameraCharacteristics = require('../models/cameraCharacteristics.js');

/* GET ALL CameraCharacteristics */
router.get('/', function(req, res, next) {
    CameraCharacteristics.find(function (err, cameraCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(cameraCharacteristicsRoutes);
    });
});

/* GET SINGLE CameraCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    CameraCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CameraCharacteristics */
router.post('/', function(req, res, next) {
    CameraCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CameraCharacteristics */
router.put('/:id', function(req, res, next) {
    CameraCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CameraCharacteristics */
router.delete('/:id', function(req, res, next) {
    CameraCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;