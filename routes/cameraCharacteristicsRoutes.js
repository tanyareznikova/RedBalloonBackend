var express = require('express');
var cameraCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var CameraCharacteristics = require('../models/cameraCharacteristics.js');

/* GET ALL CameraCharacteristics */
cameraCharacteristicsRouter.get('/', function(req, res, next) {
    CameraCharacteristics.find(function (err, cameraCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(cameraCharacteristicsRoutes);
    });
});

/* GET SINGLE CameraCharacteristics BY ID */
cameraCharacteristicsRouter.get('/:id', function(req, res, next) {
    CameraCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CameraCharacteristics */
cameraCharacteristicsRouter.post('/', function(req, res, next) {
    CameraCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CameraCharacteristics */
cameraCharacteristicsRouter.put('/:id', function(req, res, next) {
    CameraCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CameraCharacteristics */
cameraCharacteristicsRouter.delete('/:id', function(req, res, next) {
    CameraCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = cameraCharacteristicsRouter;