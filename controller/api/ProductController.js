//Product
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Product = require("../../models/product.js");
var ProductAttribute = require("../../models/productAttribute.js");
var Category = require("../../models/category.js");
const find = require("mongoose").find;
const express = require("express");
const controller = express();

controller.getProducts = ( function(req, res){

    Product.find({}, function(err, products){

        if(err) return console.log(err);
        res.render("../views/products/products-list", {products: products})
    });
});

controller.getProductByID = ( function(req, res){

    const id = req.params.id;
    Product.findOne({_id: id}, function(err, product){

        if(err) return console.log(err);
        //res.send(category);
        res.render("../views/products/single-product", {product: product})
    });
});

controller.AddNewProductAction = (async function (req , res){

    let attributes = await ProductAttribute.find();
    let categories = await Category.find();

    res.render('../views/products/new-product' , { attributes: attributes , categories: categories });

});

controller.postProduct = ( function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const productTitle = req.body.title;
    const id = req.body.categoryID;
    const productPrice = req.body.price;
    const productQuantity = req.body.quantity;
    const productDescription = req.body.description;
    const attribute = req.body.productAttribute;
    const productImg = req.body.img;
    const product = new Product({title: productTitle, categoryID: id, price: productPrice, quantity: productQuantity,
        description: productDescription, productAttribute: attribute, img: productImg});

    product.save(function(err){
        if(err) return console.log(err);
        res.send(product);
    });
});

controller.getProductAttributes = ( function(req, res){

    ProductAttribute.find({}, function(err, attributes){

        if(err) return console.log(err);
        res.render("../views/products/attributes/attributes-list", {attributes: attributes})
    });
});

controller.AddNewAttributeAction = (async function (req , res){

    res.render('../views/products/attributes/new-attribute');

});

controller.postProductAttribute = ( function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const titleAttribute = req.body.titleAttribute;
    const valueAttribute = req.body.valueAttribute;

    const productAttributes = new ProductAttribute({titleAttribute: titleAttribute, valueAttribute: valueAttribute});

    productAttributes.save(function(err){
        if(err) return console.log(err);
        res.send(productAttributes);
    });
});

controller.deleteProduct = ( function (req, res) {

    const id = req.params.id;

    Product.findByIdAndDelete(id, function (err, product) {

        if (err) return console.log(err);
        res.send(product);
    });

});

controller.putProduct = ( function(req, res){

    if(!req.body) return res.sendStatus(400);
    const prodId = req.body.id;
    const productTitle = req.body.title;
    const categoryId = req.body.categoryID;
    const productPrice = req.body.price;
    const productQuantity = req.body.quantity;
    const productDescription = req.body.description;
    const attribute = req.body.productAttribute;
    const productImg = req.body.img;
    const newProduct = {title: productTitle, categoryID: categoryId, price: productPrice, quantity: productQuantity,
        description: productDescription, productAttribute: attribute, img: productImg};

    Product.findOneAndUpdate({_id: prodId}, newProduct, {new: true}, function(err, product){
        if(err) return console.log(err);
        res.send(product);
    });
});

module.exports = controller;