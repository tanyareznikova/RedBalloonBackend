"use strict";

const express = require('express');
const NewCategoryController = require("../../controller/api/CategoryController.js");

var bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = express.json();

router.use(bodyParser.urlencoded({ extended: true }));

/* Categories */

router.get('/categories',  NewCategoryController.getCategories );
router.get('/categories/:id' ,  NewCategoryController.getCategoryByID);
router.get('/categories/new' ,  NewCategoryController.AddCategoryAction);
router.get('/categories/:id' ,  NewCategoryController.getCategoryByID );
router.post('/categories/new' , jsonParser,  NewCategoryController.postCategory);
router.put('/categories/:id' , jsonParser,  NewCategoryController.putCategory );
router.delete('/categories/delete' ,  NewCategoryController.deleteCategory );

module.exports = router;