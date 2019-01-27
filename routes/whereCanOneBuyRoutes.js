var express = require('express');
var whereCanOneBuyRouter = express.Router();
var mongoose = require('mongoose');
var WhereCanOneBuy = require('../models/whereCanOneBuy.js');

/* GET ALL WhereCanOneBuy */
whereCanOneBuyRouter.get('/', function(req, res, next) {
    WhereCanOneBuy.find(function (err, whereCanOneBuyRoutes) {
        if (err) return next(err);
        res.json(whereCanOneBuyRoutes);
    });
});

/* GET SINGLE WhereCanOneBuy BY ID */
whereCanOneBuyRouter.get('/:id', function(req, res, next) {
    WhereCanOneBuy.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE WhereCanOneBuy */
whereCanOneBuyRouter.post('/', function(req, res, next) {
    WhereCanOneBuy.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE WhereCanOneBuy */
whereCanOneBuyRouter.put('/:id', function(req, res, next) {
    WhereCanOneBuy.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE WhereCanOneBuy */
whereCanOneBuyRouter.delete('/:id', function(req, res, next) {
    WhereCanOneBuy.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = whereCanOneBuyRouter;