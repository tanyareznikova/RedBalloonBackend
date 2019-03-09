//Product
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Product = require("../../models/product.js");
var ProductAttribute = require("../../models/productAttribute.js");
var Category = require("../../models/category.js");
const find = require("mongoose").find;
const express = require("express");
const controller = express();

const fs = require('fs');
//const rimraf = require('rimraf');
var multer = require('multer');
const path   = require('path');
//var upload = multer({ dest: 'uploads/' })
//var upload    = require('../../public/javascripts/upload');
//var upload = multer({ dest: 'uploads/' });

var async = require("async");
/*
//var server = express.createServer();
controller.getUpload = (async function (req, res, next) {
    await Product.findById(a, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });
});
*/
controller.getProducts = (async function(req, res){

    await Product.find({}, function(err, products){

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

    //var nProd = new Product({title: req.body.title});
/*
    async.each(req ,function(x,callback){
        async.each(listhash, function(y,callback) {
            if (x.item.toLowerCase().replace(/\s/g, '') == y) {
                nProd.categoryID.push(x);
            }
        })

*/
    const productTitle = req.body.title;
    const id = req.body.categoryID;
    const productPrice = req.body.price;
    //const productQuantity = req.body.quantity;
    const productDescription = req.body.description;
    const attribute = req.body.productAttribute;


    // img path
    var imgPath = 'D:\\Диплом\\ДИПЛОМ\\Project\\RedBalloonBackend\\public\\images\\productImg\\huawei\\huawei_mate-20.jpg';

    //var newPath = "files/"+req.file.data;
    //var uploadProd = await new Product;
    //uploadProd.img.data = req.body.data;
    //uploadProd.img.contentType = 'image/jpg';

    var prod = new Product();

        //prod.img.data = fs.readFileSync(req.file.path);
        //prod.img.data = fs.readFileSync(req.files[0].path);
        prod.img.data = fs.readFileSync(imgPath);
        prod.img.contentType = 'image/jpg';

        //prod.img.data = fs.readFileSync(imgPath);
        //prod.img.contentType = 'image/jpg';

    //res.contentType(prod.img.contentType);
    //res.send(prod.img.data);

    //var uProd = req.body;
    //uProd.img.data = fs.readFileSync(req.file.path);
    //uProd.img.contentType = req.file.mimetype;


    const product = new Product({title: productTitle, categoryID: id, price: productPrice,
        description: productDescription, productAttribute: attribute,
        img: prod});

        product.save(function(err) {
            if(err) return console.log(err);
            res.send(product);

        });

    //"multer": "^1.4.1",

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
    //const valueAttribute = req.body.valueAttribute;

    const productAttributes = new ProductAttribute({titleAttribute: titleAttribute});

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
    //const productQuantity = req.body.quantity;
    const productDescription = req.body.description;
    const attribute = req.body.productAttribute;
    const productImg = req.body.img;
    //const productImg = req.file.path;
    const newProduct = {title: productTitle, categoryID: categoryId, price: productPrice,
        description: productDescription, productAttribute: attribute, img: productImg};

    Product.findOneAndUpdate({_id: prodId}, newProduct, {new: true}, function(err, product){
        if(err) return console.log(err);
        res.send(product);
    });
});

module.exports = controller;
