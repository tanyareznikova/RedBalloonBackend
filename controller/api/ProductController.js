//Product
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Product = require("../../models/product.js");
var ProductAttribute = require("../../models/productAttribute.js");
var Category = require("../../models/category.js");
var Image = require("../../models/image.js");
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

var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

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

controller.postImage = ( function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            return res.end('error request file');
        }
        var data = new Product({

            title: req.body.title,
            categoryID: req.body.categoryID,
            price: req.body.price,
            description: req.body.description,
            productAttribute: req.body.productAttribute,
            path: req.body.path,
            originalname: req.file.originalname
        });
        data.save().then((result) => {
            res.send(result);
        });
        console.log(req.file);
        res.end('upload file success');
        console.log('success');
    });
});

controller.postProduct = ( upload.any(), async function (req, res) {

    //res.send(req.files);

    if(!req.body) return res.sendStatus(400);

    //const images = new Image.create({
        //'path': path,
       // 'originalname': imageName
    //});

    //res.send(req.files);
    //res.send(req.files);



    const productTitle = req.body.title;
    const productPrice = req.body.price;
    //const productQuantity = req.body.quantity;
    const productDescription = req.body.description;
    //const categories = JSON.parse(req.body.categories);
    //const attributes = JSON.parse(req.body.attributes);
    const categories = req.body.categories;
    const attributes = req.body.attributes;
    const img = req.files;

    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    //const newImage = req.body.images;
    //res.send(req.files);
/*
    for ( let i = 0 ; i < categories ; i++ ){

        await Category.create({
            'categoryTitle': categories[i].categoryTitle
        });

    }//for i

    for ( let i = 0 ; i < attributes ; i++ ){

        await ProductAttribute.create({
            'titleAttribute': attributes[i].titleAttribute
        });

    }//for i

    if( req.files ){

        //var path = req.files[0].path;
        //var imageName = req.files[0].originalname;

        let imageName = req.files.image;
        let path = `public/images/newImage`;

        try{

            fs.mkdirSync(path);

        }//try
        catch(ex){ }

        // fs.existsSync()
        Image.mv( `${path}/${imageName.name}` ,async function(err) {

            if (err){
                console.log('FILE UPLOAD ERROR:' , err);
                return;
            }//if

            await Image.create({
                //'imagePath': `/images/${newProduct.productID}/${imageName.name}`,
                'path' : path,
                'originalname' : imageName

            });

        });

    }//if
*/

    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;

    const product = await new Product({title: productTitle,
        categories: categories, price: productPrice,
        description: productDescription, attributes: attributes, files: img
    });

    //var imagepath = {};
    //imagepath['path'] = path;
    //imagepath['originalname'] = imageName;

    //var nProd = new Product({title: req.body.title});
/*
    async.each(req ,function(x,callback){
        async.each(listhash, function(y,callback) {
            if (x.item.toLowerCase().replace(/\s/g, '') == y) {
                nProd.categoryID.push(x);
            }
        })

*/



    // img path
    //var imgPath = 'D:\\Диплом\\ДИПЛОМ\\Project\\RedBalloonBackend\\public\\images\\productImg\\huawei\\huawei_mate-20.jpg';

    //var newPath = "files/"+req.file.data;
    //var uploadProd = await new Product;
    //uploadProd.img.data = req.body.data;
    //uploadProd.img.contentType = 'image/jpg';
/*
    var prod = new Product({
        data: fs.readFileSync(imgPath),
        contentType: 'image/jpg'
    });
*/
        //prod.img.data = fs.readFileSync(req.file.path);
        //prod.img.data = fs.readFileSync(req.files[0].path);


        //prod.img.data = fs.readFileSync(imgPath);
        //prod.img.contentType = 'image/jpg';

    //res.contentType(prod.img.contentType);
    //res.send(prod.img.data);

    //var uProd = req.body;
    //uProd.img.data = fs.readFileSync(req.file.path);
    //uProd.img.contentType = req.file.mimetype;



        product.save(function(err) {
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
