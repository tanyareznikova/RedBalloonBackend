var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BindingCharacteristics = require('../../models/tempModels/bindingCharacteristics.js');

/* GET ALL BindingCharacteristics */
router.get('/', function(req, res, next) {
    BindingCharacteristics.find(function (err, bindingCharacteristicsRoutes) {
        if (err) return next(err);
        res.json(bindingCharacteristicsRoutes);
    });
});

/* GET SINGLE BindingCharacteristics BY ID */
router.get('/:id', function(req, res, next) {
    BindingCharacteristics.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE BindingCharacteristics */
router.post('/', function(req, res, next) {
    BindingCharacteristics.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE BindingCharacteristics */
router.put('/:id', function(req, res, next) {
    BindingCharacteristics.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE BindingCharacteristics */
router.delete('/:id', function(req, res, next) {
    BindingCharacteristics.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;