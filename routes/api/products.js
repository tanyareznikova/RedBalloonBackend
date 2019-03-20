"use strict";

const express = require('express');

const router = express.Router();

const ProductController = require('../../controller/old/api/NewProductController');

router.get('/products/list' , ProductController.GetProducts );
router.get('/products/:id' ,ProductController.GetProduct );
router.post('/get-products-for-cart' ,ProductController.GetProductsByIds );

module.exports = router;
