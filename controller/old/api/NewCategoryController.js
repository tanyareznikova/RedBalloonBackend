"use strict";

//const Op = require('sequelize').Op;
const mongoose = require('mongoose').mongoose;

const Product = require('../../../models/product').Product;
const Category = require('../../../models/category').Category;

const Response = require('../../../models/utils/Response');
//const ProductImages = require('../../model/defenitions').ProductImages;
const find = require("mongoose").find;
const express = require("express");
const controller = express();

const RegularExpressions = require('../../../models/utils/RegularExpressions');

controller.GetCategories = (async function( req , res ){


    let response = new Response();

    try{

        const categories = await Category.find();

        for ( let i = 0 ; i < categories.length ; i++ ){

            //categories[i].translation =   await GetConstantTranslation(categories[i].categoryTitle);
            await categories[i].categoryTitle;

        }//for i

        response.code = 200;
        response.data = categories;

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";
        console.log(ex);

    }//catch

    res.status(response.code);
    res.send( response );

});

controller.GetProductsWithCategory = (async function( req , res ){


    let response = new Response();

    try{

        let categoryID = +req.params.categoryID;
        let limit = +req.query.limit || 10;
        let offset = +req.query.offset || 0;

        //let limitAndSkip = +req.query.skip(0).limit(10);

        if( isNaN(categoryID) ){

            response.code = 404;
            response.data = {
                categoryID: categoryID
            };

            response.message = "Категория передана не верно!";

            res.status(response.code);
            return res.send(response) ;

        }//if

        const category = await Category.findById(categoryID);

        if( !category ){

            response.code = 404;
            response.data = {
                categoryID: categoryID
            };

            response.message = "Категория не найдена!";

            res.status(response.code);
            return res.send(response) ;

        }//if

        let products = await Product.find({
            limit: limit,
            offset: offset,
            //limitAndSkip: limitAndSkip,
            type: ['_id'],
            where: {
                categoryID: categoryID
            }
        });
            //.where('categoryID').gte(categoryID);


        let ids = [].map.call( products , p => p.productID );

        products = await Product.find({
            sort: {productID: -1},
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
                type: ['img'],
                where: {
                    productID: product.productID
                }
            })
                //.where('_id').gte(product.productID);

        }//for i



        response.code = 200;
        response.data = {
            "category": await category.categoryTitle,
            "products": products
        };

    }//try
    catch(ex){

        response.code = 500;
        response.data = null;
        response.message = "Внутренняя ошибка сервера!";

    }//catch

    res.status(response.code);
    res.send( response );

});

module.exports = controller;
