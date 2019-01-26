var express = require('express');
var bodyCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var BodyCharacteristics = require('../models/bodyCharacteristics.js');

/* GET ALL PRODUCTS */
bodyCharacteristicsRouter.get('/', function(req, res, next) {
    BodyCharacteristics.find(function (err, bodyCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(bodyCharacteristicsRoutes);
    });
});

/* GET SINGLE PRODUCT BY ID */
bodyCharacteristicsRouter.get('/:id', function(req, res, next) {
    BodyCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE PRODUCT */
bodyCharacteristicsRouter.post('/', function(req, res, next) {
    BodyCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE PRODUCT */
bodyCharacteristicsRouter.put('/:id', function(req, res, next) {
    BodyCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE PRODUCT */
bodyCharacteristicsRouter.delete('/:id', function(req, res, next) {
    BodyCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = bodyCharacteristicsRouter;