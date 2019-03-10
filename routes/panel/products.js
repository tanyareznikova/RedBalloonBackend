"use strict";

const express = require('express');
const NewProductController = require("../../controller/api/ProductController.js");

const router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");
var mongoose = require('mongoose');
//var upload = multer({ dest: '/uploads' })
//var upload    = require('../../public/javascripts/upload');
const jsonParser = express.json();


router.use(bodyParser.urlencoded({ extended: true }));
/*
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
*/
/* Products */

router.get('/products', NewProductController.getProducts );
router.get('/products/attributes',NewProductController.getProductAttributes );

router.get('/products/new'  ,NewProductController.AddNewProductAction );
router.post( '/products/new' , jsonParser , NewProductController.postProduct );

router.get('/products/:id', NewProductController.getProductByID );
router.put('/products/:id', jsonParser, NewProductController.putProduct );

router.get('/products/attributes/new', NewProductController.AddNewAttributeAction );
router.post('/products/attributes/new', jsonParser, NewProductController.postProductAttribute );

router.delete('/products/delete' , NewProductController.deleteProduct );

module.exports = router;
