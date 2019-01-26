var express = require('express');
var bindingCharacteristicsRouter = express.Router();
var mongoose = require('mongoose');
var BindingCharacteristics = require('../models/bindingCharacteristics.js');

/* GET ALL PRODUCTS */
bindingCharacteristicsRouter.get('/', function(req, res, next) {
    BindingCharacteristics.find(function (err, bindingCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(bindingCharacteristicsRoutes);
    });
});

/* GET SINGLE PRODUCT BY ID */
bindingCharacteristicsRouter.get('/:id', function(req, res, next) {
    BindingCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE PRODUCT */
bindingCharacteristicsRouter.post('/', function(req, res, next) {
    BindingCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE PRODUCT */
bindingCharacteristicsRouter.put('/:id', function(req, res, next) {
    BindingCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE PRODUCT */
bindingCharacteristicsRouter.delete('/:id', function(req, res, next) {
    BindingCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = bindingCharacteristicsRouter;