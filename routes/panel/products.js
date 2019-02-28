"use strict";

const express = require('express');
const NewProductController = require("../../controller/api/ProductController.js");
//const AdminController = require("../../controller/panel/AdminController");

const router = express.Router();

var bodyParser = require('body-parser');

const jsonParser = express.json();

router.use(bodyParser.urlencoded({ extended: true }));

/* Products */

//router.use(AdminController.CheckAdminAccess);

router.get('/products', NewProductController.getProducts );
//router.get('/products/attributes',NewProductController.GetAttributesAction );

router.get('/products/new'  ,NewProductController.AddNewProductAction );
router.post('/products/new' , jsonParser, NewProductController.postProduct );

router.get('/products/:id', NewProductController.getProductByID );
router.put('/products/:id', jsonParser, NewProductController.putProduct );

//router.get('/products/attributes/new', NewProductController.AddNewAttributeAction );
//router.post('/products/attributes/new', jsonParser, NewProductController.AddNewAttribute );

router.delete('/products/delete' , NewProductController.deleteProduct );

module.exports = router;