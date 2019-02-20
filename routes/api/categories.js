"use strict";

const express = require('express');

const router = express.Router();

const CategoryController = require('../../controller/api/NewCategoryController');

router.get('/category/list' , CategoryController.GetCategories );
router.get('/category/plist/:categoryID' , CategoryController.GetProductsWithCategory );


module.exports = router;