"use strict";

const express = require('express');

const router = express.Router();

const CategoryController = require('../../controller/old/api/NewCategoryController');

router.get('/categories/list' , CategoryController.GetCategories );
router.get('/categories/plist/:categoryID' , CategoryController.GetProductsWithCategory );


module.exports = router;
