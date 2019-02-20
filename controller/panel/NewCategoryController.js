"use strict";

const Category = require('../../models/category');
const Product = require('../../models/product');
//const Product = require('../../models/defenitions').Product;
//const ProductImages = require('../../models/defenitions');

const RegularExpressions = require('../../models/utils/RegularExpressions');

const Response = require('../../models/utils/Response');

const mongoose = require('mongoose').mongoose;
//const Op = require('sequelize').Op;

module.exports.GetCategoriesListAction = async ( req , res )=>{

    try{

        let categories = await Category.find();

        for ( let i = 0 ; i < categories.length ; i++ ){

            let category = categories[i];

            category.productsAmount = await Product.count({
                where: {
                    categoryID: category.categoryID
                }
            });

        }//for i

        res.render('categories/categories-list',{'categories': categories});


    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.GetCategoryAction = async ( req , res )=>{

    try{

        let categoryID = +req.params.id;

        let category = await Category.findById( categoryID );

        res.render('categories/single-category',{'category': category});

    }//try
    catch(ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.UpdateCategory = async ( req , res )=>{

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

};

module.exports.GetProductsByCategories = async(req,res)=>{

    try{

        let categoryID = +req.params.categoryID;

        let products = await Product.find({
            where: {
                categoryID: categoryID
            },
            attributes: [ 'productID'  ]
        });

        let ids = [].map.call( products , p => p.productID );

        products = await Product.find({
            order: [
                [ 'productID' , 'DESC' ]
            ],
            attributes: {
                exclude: [ 'created' , 'updated' , 'productDescription' ]
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
                attributes: [ 'img' ],
                where: {
                    productID: product.productID
                }
            });
            product.categoryTitle = await Category.findOne({
                attributes:['categoryTitle'],
                where:{
                    categoryID : categoryID
                }
            });
            console.log(product);

        }//for i

        res.render('categories/products-by-categories',{'products': products});

    }//try
    catch (ex){

        res.render('error',{'error': ex});

    }//catch

};

module.exports.AddCategoryAction = async ( req , res )=>{

    res.render('categories/new-category');

};

module.exports.AddCategory = async ( req , res )=>{

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

};

module.exports.RemoveCategory = async ( req , res )=>{

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

};