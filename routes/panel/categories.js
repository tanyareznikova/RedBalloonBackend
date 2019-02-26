"use strict";

const express = require('express');
//const NewCategoryController = require("../../controller/panel/NewCategoryController.js");
const NewCategoryController = require("../../controller/api/CategoryController.js");

//const AdminController = require("../../controller/panel/AdminController");
var bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = express.json();
// const router = express();
//router.use(AdminController.CheckAdminAccess);
router.use(bodyParser.urlencoded({ extended: true }));

/* Categories */

router.get('/categories',  NewCategoryController.getCategories );
router.get('/categories/:id' ,  NewCategoryController.getCategoryByID);
router.get('/categories/new' ,  NewCategoryController.AddCategoryAction);
router.get('/categories/:id' ,  NewCategoryController.getCategoryByID );
router.post('/categories/new' , jsonParser,  NewCategoryController.postCategory);
router.put('/categories/:id' , jsonParser,  NewCategoryController.putCategory );
router.delete('/categories/delete' ,  NewCategoryController.deleteCategory );

//router.get('/categories',  NewCategoryController.GetCategoriesListAction );
//router.get('/categories/:categoryID' ,  NewCategoryController.GetProductsByCategories);
//router.get('/category/new' ,  NewCategoryController.AddCategoryAction);
//router.get('/category/:id' ,  NewCategoryController.GetCategoryAction );
//router.post('/category/new' ,  NewCategoryController.AddCategory);
//router.put('/category/:id' ,  NewCategoryController.UpdateCategory );
//router.delete('/categories/delete' ,  NewCategoryController.RemoveCategory );

module.exports = router;