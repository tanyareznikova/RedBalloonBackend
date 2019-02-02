var express = require('express');
//var router = require('express').Router();
var router = express.Router();
//var router = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //parses information from POST
//var Category = require('../models/category.js');
var Category = require("../controller/api/CategoryController.js");
//import category from '../models/category.js';

//ЗАПРОС REST API in Terminal
//curl -i -X POST -d "{\"categoryTitle\": \"iPhone\"}" -H "Content-Type:application/json" localhost:3000/categories

// Get all employees
router.get('/', Category.list);

// Get single employee by id
router.get('/show/:id', Category.show);

// Create employee
router.get('/create', Category.create);

// Save employee
router.post('/save', Category.save);

// Edit employee
router.get('/edit/:id', Category.edit);

// Edit update
router.post('/update/:id', Category.update);

// Edit update
router.post('/delete/:id', Category.delete);

/*
router.use(bodyParser.urlencoded({ extended: true }))
// GET ALL Category
router.get('/', function(req, res, next) {
    Category.find(function (err, category) {
        if (err) return next(err);
        res.json(category);
    });
});

//GET SINGLE Category BY ID
router.get('/:id', function(req, res, next) {
    Category.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//SAVE Category
router.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// UPDATE Category
router.put('/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// DELETE Category
router.delete('/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
*/

module.exports = router;
