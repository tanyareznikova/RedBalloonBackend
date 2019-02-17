
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//import Category from "/models/category";
//import Category from "../../models/category.js";
//const mongoose = require("mongoose");
var Category = require("../../models/category.js");
const find = require("mongoose").find;
//const express = require("express");
//const controller = express();
//const jsonParser = express.json();
//var mongoose = require("mongoose");
//var Category = mongoose.model("Category", CategorySchema);
/*
controller.getCategories = ( function(req, res){

    Category.find({}, function(err, categories){

        if(err) return console.log(err);
        res.send(categories)
    });
});

controller.getCategoryBeID = ( function(req, res){

    const id = req.params.id;
    Category.findOne({_id: id}, function(err, category){

        if(err) return console.log(err);
        res.send(category);
    });
});

controller.postCategory = (jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const categoryTitle = req.body.categoryTitle;
    const category = new Category({categoryTitle: categoryTitle});

    category.save(function(err){
        if(err) return console.log(err);
        res.send(category);
    });
});

controller.deleteCategory = ( function(req, res){

    const id = req.params.id;
    Category.findByIdAndDelete(id, function(err, category){

        if(err) return console.log(err);
        res.send(category);
    });
});

controller.putCategory = (jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const categoryTitle = req.body.categoryTitle;
    const newCategory = {categoryTitle: categoryTitle};

    Category.findOneAndUpdate({_id: id}, newCategory, {new: true}, function(err, category){
        if(err) return console.log(err);
        res.send(category);
    });
});
*/
  /*
    // DO GET
    function ajaxGet(){
        $.ajax({
            type : "GET",
            url : window.location + "categories/category/create",
            success: function(result){
                $.each(result, function(i, category){

                    var customerRow = '<tr>' +
                        '<td>' + category.id + '</td>' +
                        '<td>' + category.categoryTitle.toUpperCase() + '</td>' +
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
exports.category_list = function(req, res) {
    Category.find({}).exec(function (err, categories) {
        //find({Category}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
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
    var category = new Category(
        {categoryTitle: req.body.categoryTitle}
    );

    category.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.redirect(category.url);
    });

};
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
    Category.findOne({'_id':id},function(err, category) {
        //return res.send(category);
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: category});
        }
    });
};
exports.add = function(req, res) {
    Category.create(req.body, function (err, category) {
        if (err) return console.log(err);
        return res.send(category);

        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: category});
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
    Category.remove({'_id':id},function(category) {
        //return res.send(category);
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/categories", {categories: category});
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

//module.exports = controller;