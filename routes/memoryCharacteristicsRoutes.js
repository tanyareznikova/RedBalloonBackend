var express = require('express');
var memoryCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var MemoryCharacteristics = require('../models/memoryCharacteristics.js');

/* GET ALL MemoryCharacteristics */
memoryCharacteristicsRouter.get('/', function(req, res, next) {
    MemoryCharacteristics.find(function (err, memoryCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(memoryCharacteristicsRoutes);
    });
});

/* GET SINGLE MemoryCharacteristics BY ID */
memoryCharacteristicsRouter.get('/:id', function(req, res, next) {
    MemoryCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE MemoryCharacteristics */
memoryCharacteristicsRouter.post('/', function(req, res, next) {
    MemoryCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE MemoryCharacteristics */
memoryCharacteristicsRouter.put('/:id', function(req, res, next) {
    MemoryCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE MemoryCharacteristics */
memoryCharacteristicsRouter.delete('/:id', function(req, res, next) {
    MemoryCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = memoryCharacteristicsRouter;