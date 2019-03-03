
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//import Category from "/models/categories";
//import Category from "../../models/categories.js";
//const mongoose = require("mongoose");
var Category = require("../../models/category.js");
const find = require("mongoose").find;
const express = require("express");
const controller = express();
const mongoose = require('mongoose').mongoose;

//const jsonParser = express.json();
//var mongoose = require("mongoose");
//var Category = mongoose.model("Category", CategorySchema);

controller.getCategories = ( function(req, res){


    Category.find({}, function (err, categories) {

        //res.send({...});
        //res.json();
        //res.render("../views/categories/categories-list", {categories: categories})
        if (err) return console.log(err);
        //res.render("../views/categories/category-list", {categories: categories})
        res.render("../views/categories/categories-list", {categories: categories})
    });

});

controller.getCategoryByID = ( function(req, res){




    const id = req.params.id;
    Category.findOne({_id: id}, function(err, category){

        if(err) return console.log(err);
        //res.send(category);
        res.render("../views/categories/single-category", {category: category})
    });
});

controller.GetProductsByCategories = (async function(req, res){

    try{

        let CategoryId = +req.params.id;

        let products = await Product.find({
            where: {
                id: CategoryId
            },
            type: [ '_id'  ]
        });

        let ids = [].map.call( products , p => p._id );

        products = await Product.find({
            sort: [
                [ '_id' , -1 ]
            ],
            type: {
                exclude: [ 'createdAt' , 'updatedAt' , 'description' ]
            },
            where:{
                _id: {
                    [mongoose.in]: ids
                }
            }
        });

        for ( let i = 0 ; i < products.length ; i++ ){

            let product = products[i];
            product.image = await Product.findOne({
                type: [ 'img' ],
                where: {
                    _id: product._id
                }
            });
            product.categoryTitle = await Category.findOne({
                type:['categoryTitle'],
                where:{
                    _id : CategoryId
                }
            });
            console.log(product);

        }//for i

        res.render('../views/categories/products-by-categories',{products: products});

    }//try
    catch (ex){

        res.render('error',{'error': ex});

    }//catch

});

controller.AddCategoryAction =  (function ( req , res ){

    res.render('../views/categories/new-category');

});

controller.postCategory = ( function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const categoryTitle = req.body.categoryTitle;
    const category = new Category({categoryTitle: categoryTitle});

    category.save(function(err){
        if(err) return console.log(err);
        res.send(category);
    });
});

controller.deleteCategory = ( function (req, res) {


    const id = req.body._id;

    Category.findByIdAndDelete(id, function (err, category) {

        if (err)
            return console.log(err);
        res.send(category);
    });

});

controller.putCategory = ( function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const categoryTitle = req.body.categoryTitle;
    const newCategory = {categoryTitle: categoryTitle};

    Category.findOneAndUpdate({_id: id}, newCategory, {new: true}, function(err, category){
        if(err) return console.log(err);
        res.send(category);
    });
});

/*
  // DO GET
  function ajaxGet(){
      $.ajax({
          type : "GET",
          url : window.location + "categories/categories/create",
          success: function(result){
              $.each(result, function(i, categories){

                  var customerRow = '<tr>' +
                      '<td>' + categories.id + '</td>' +
                      '<td>' + categories.categoryTitle.toUpperCase() + '</td>' +
                      '</tr>';

                  $('#categoryTable tbody').append(customerRow);

              });

              $( "#categoryTable tbody tr:odd" ).addClass("info");
              $( "#categoryTable tbody tr:even" ).addClass("success");
          },
          error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
          }
      });
  }

*/
/*
exports.category_list = function(req, res) {
  Category.find({}).exec(function (err, categories) {
      //find({Category}).exec(function (err, categories) {
      if (err) {
          console.log("Error:", err);
      }
      else {
          res.render("../views/categories", {categories: categories});
      }
  });
};

// Display Category create form on GET.
exports.category_create_get = function(req, res) {
  //res.send('NOT IMPLEMENTED: Category create GET');
  res.render('categories', { title: 'Создание категории' });
};

module.exports.category_create_post = async function ( req , res ) {

  console.log(req.body);
  console.log(req.body.categoryTitle);
  res.send(req.body);
  //try { let user = await user.findAll(); } catch( ex ) { ... }
  var categories = new Category(
      {categoryTitle: req.body.categoryTitle}
  );

  categories.save(function (err) {
      if (err) { return next(err); }
      // Successful - redirect to new author record.
      res.redirect(categories.url);
  });

};
*/
/*
exports.findAll = function(req, res){
    Category.find({},function(err, categories) {
        //return res.send(categories);
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: categories});
        }
    });
};
exports.findById = function(req, res){
    var id = req.params.id;
    Category.findOne({'_id':id},function(err, categories) {
        //return res.send(categories);
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: categories});
        }
    });
};
exports.add = function(req, res) {
    Category.create(req.body, function (err, categories) {
        if (err) return console.log(err);
        return res.send(categories);

        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: categories});
        }

    });
}
exports.update = function(req, res) {
    var id = req.params.id;
    var updates = req.body;

    Category.update({"_id":id}, req.body,
        function (err, numberCategories) {
            if (err) return console.log(err);
            console.log('Updated %d categories', numberCategories);
            res.send(202);
        });
}
exports.delete = function(req, res){
    var id = req.params.id;
    Category.remove({'_id':id},function(categories) {
        //return res.send(categories);
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: categories});
        }
    });
};

exports.import = function(req, res){
    Category.create(
        { "categoryTitle": "Xiaomi"},
        { "categoryTitle": "Huawei"},
        { "categoryTitle": "OPPO"}
        , function (err) {
            if (err) return console.log(err);
            return res.send(202);
        });
};
*/

module.exports = controller;