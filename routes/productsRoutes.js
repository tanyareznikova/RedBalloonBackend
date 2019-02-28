var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js');

var bodyParser = require('body-parser'); //parses information from POST

var product_Controller = require("../controller/api/ProductController.js");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/categoryList", product_Controller.getCategories);
router.get("/categoryList/:id", product_Controller.getCategoryByID);
router.post("/categoryList", product_Controller.postCategory);
router.delete("/categoryList/:id", product_Controller.deleteCategory);
router.put("/categoryList", product_Controller.putCategory);

/*
// GET ALL PRODUCTS
router.get('/', function(req, res, next) {
    Product.find(function (err, productsRoutes) {
        if (err) return next(err);
        res.json(productsRoutes);
    });
});

//GET SINGLE PRODUCT BY ID
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//SAVE PRODUCT
router.post('/', function(req, res, next) {
    Product.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

 //UPDATE PRODUCT
router.put('/:id', function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

 //DELETE PRODUCT
router.delete('/:id', function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
*/

module.exports = router;