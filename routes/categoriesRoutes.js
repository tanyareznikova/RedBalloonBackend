var express = require('express');
//var router = require('express').Router();
var router = express.Router();
//var router = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //parses information from POST
//var Category = require('../models/category.js');
//var Category = require("../controller/api/CategoryController.js");
//import category from '../models/category.js';
var category_Controller = require("../controller/api/CategoryController.js");

//ЗАПРОС REST API in Terminal
//curl -i -X POST -d "{\"categoryTitle\": \"iPhone\"}" -H "Content-Type:application/json" localhost:3000/categories

router.use(bodyParser.urlencoded({ extended: true }))
// GET catalog home page.
router.get('/list', category_Controller.category_list);

// GET request for creating a category. NOTE This must come before routes that display category (uses id).
router.get('/category/create', category_Controller.category_create_get);

// POST request for creating category.
router.post('/category/create', category_Controller.category_create_post2);

// GET request to delete category.
router.get('/category/:id/delete', category_Controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_Controller.category_delete_post);

// GET request to update category.
router.get('/category/:id/update', category_Controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_Controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_Controller.category_detail);

// GET request for list of all category items.
//router.get('/categories', category_Controller.category_list);

/*
// Get all categories
router.get('/', Category.list);

// Get single category by id
router.get('/categories/:id', Category.show);

// Create category
router.get('/categories', Category.create);

// Save category
router.post('/categories', Category.save);

// Edit category
router.get('/categories/:id', Category.edit);

// Edit update
router.post('/categories/:id', Category.update);

// Edit update
router.post('/categories/:id', Category.delete);
*/
/*

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
