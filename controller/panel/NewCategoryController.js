"use strict";

const Category = require('../../models/category').Category;
const Product = require('../../models/product').Product;
//const Product = require('../../models/defenitions').Product;
//const ProductImages = require('../../models/defenitions');

const RegularExpressions = require('../../models/utils/RegularExpressions');

const Response = require('../../models/utils/Response');
const find = require("mongoose").find;
const mongoose = require('mongoose').mongoose;
const express = require("express");
const controller = express();

controller.GetCategoriesListAction = (async function ( req , res ){

    try{

        let categories = await Category.find();

        res.render('../views/categories/categories-list',{'categories': categories});
    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

});

controller.GetCategoryAction = (async function ( req , res ){

    try{

        let categoryID = +req.params.id;

        let category = await Category.findById( categoryID );

        res.render('../views/categories/single-categories',{'category': category});

    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

});

controller.UpdateCategory = (async function ( req , res ){

    let response = new Response();

    try{

        let categoryID = +req.params.id;
        //let categoryTitle = req.body.categoryTitle.trim();
        let categoryTitle = req.body.categoryTitle;

        if( isNaN(categoryID) ){

            response.code = 400;
            response.message = 'ID категории задан не верно!';
            response.data = categoryID;

            return res.send(response);

        }//if

        if(!categoryTitle.match(RegularExpressions.CategoryTitleExpression)){

            response.code = 400;
            response.message = 'Название категории имеет неверный формат!';
            response.data = categoryTitle;

            return res.send(response);

        }//if

        let category = await Category.findById(categoryID);

        if( category ){

            let updateResult = await category.update({
               'categoryTitle':  categoryTitle
            });

            response.code = 200;
            response.message = 'Категория успешно обновлена';
            response.data = updateResult;

            res.send(response);

        }//if
        else{


            response.code = 404;
            response.message = 'Категория не найдена!';
            response.data = categoryID;

            res.send(response);

        }//else

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

});

controller.GetProductsByCategories = (async function (req,res){

    try{

        let categoryID = +req.params.categoryID;

        let products = await Product.find({
            type: [ 'productID'  ],
            where: {
                categoryID: categoryID
            }
        });

        let ids = [].map.call( products , p => p.productID );

        products = await Product.find({
            sort: [
                [ 'productID' , 'DESC' ]
            ],
            type: {
                exclude: [ 'createdAt' , 'updatedAt' , 'productDescription' ]
            },
            where:{
                productID: {
                    [mongoose.in]: ids
                }
            }
        });

        for ( let i = 0 ; i < products.length ; i++ ){

            let product = products[i];
            product.image = await Product.findOne({
                type: [ 'img' ],
                where: {
                    productID: product.productID
                }
            });
            product.categoryTitle = await Category.findOne({
                type:['categoryTitle'],
                where:{
                    categoryID : categoryID
                }
            });
            console.log(product);

        }//for i

        res.render('../views/categories/products-by-categories',{'products': products});

    }//try
    catch (ex){

        res.render('error',{'error': ex});

    }//catch

});

controller.AddCategoryAction = (async function ( req , res ){

    res.render('../views/categories/new-categories');

});

controller.AddCategory = (async function ( req , res ){

    let response = new Response();

    try{

        let categoryTitle = req.body.categoryTitle;

        if(!categoryTitle.match(RegularExpressions.CategoryTitleExpression)){

            response.code = 400;
            response.message = 'Название категории имеет неверный формат!';
            response.data = categoryTitle;

            return res.send(response);

        }//if

        let newCategory = await Category.create({
           categoryTitle: categoryTitle
        });

        response.code = 200;
        response.message = 'Категория успешно добавлена';
        response.data = newCategory;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

});

controller.RemoveCategory = (async function ( req , res ){

    let response = new Response();

    try{

        let categoryID = +req.body.categoryID;

        if( isNaN(categoryID) ){

            response.code = 400;
            response.message = 'ID категории задан не верно!';
            response.data = categoryID;

            return res.send(response);

        }//if

        let category = await Category.findById(categoryID);

        if(!category){

            response.code = 404;
            response.message = 'Категория не найдена!';
            response.data = categoryID;

            return res.send(response);


        }//if

        await category.destroy();

        response.code = 200;
        response.message = 'Категория успешно удалена';

        res.send(response);

    }//try
    catch(ex){


        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

});

module.exports = controller;