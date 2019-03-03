//Product Reviews
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var ProductReviews = require("../../models/productReviews.js").ProductReviews;
const find = require("mongoose").find;
const express = require("express");
const controller = express();

controller.getProductReviews = ( function(req, res){

    let limit = req.query.limit || 10;
    let skip = req.query.skip || 0;

    ProductReviews.find({
        skip: skip,
        limit: limit,
        sort: [
            ['_id' , -1]
        ]}, function(err, productReviews){

        if(err) return console.log(err);
        res.render("../views/productReviews/productReviews-list", {productReviews: productReviews})
    });
});

controller.getProductReviewByID = ( function(req, res){

    const id = req.params.id;
    ProductReviews.findOne({_id: id}, function(err, productReview){

        if(err) return console.log(err);
        //res.send(category);
        res.render("../views/productReviews/productReviews-single", {productReview: productReview})
    });
});

controller.postProductReview = ( function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const plus = req.body.plus;
    const minus = req.body.minus;
    const message = req.body.message;
    const productID = req.body.productID;

    const productReview = new ProductReviews({name: name, plus: plus, minus: minus, message: message,
        productID: productID});

    productReview.save(function(err){
        if(err) return console.log(err);
        res.send(productReview);
    });
});

controller.deleteProductReview = ( function (req, res) {

    const id = req.params.id;

    ProductReviews.findByIdAndDelete(id, function (err, productReview) {

        if (err) return console.log(err);
        res.send(productReview);
    });

});

controller.putProductReview = ( function(req, res){

    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const name = req.body.name;
    const plus = req.body.plus;
    const minus = req.body.minus;
    const message = req.body.message;
    const productID = req.body.productID;

    const newProductReview = {name: name, plus: plus, minus: minus, message: message,
        productID: productID};

    ProductReviews.findOneAndUpdate({_id: id}, newProductReview, {new: true}, function(err, productReview){
        if(err) return console.log(err);
        res.send(productReview);
    });
});

module.exports = controller;