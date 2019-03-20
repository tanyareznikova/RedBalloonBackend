"use strict";

const Product = require('../../../models/product').Product;
const Category = require('../../../models/category').Category;
const Response = require('../../../models/utils/Response');
const ProductAttributes = require('../../../models/productAttribute').ProductAttributes;

//const ProductAndAttributes = require('../../model/defenitions').ProductAndAttributes;

//const ProductAndCategories = require('../../model/defenitions').ProductAndCategories;
//const ProductImages = require('../../model/defenitions').ProductImages;
const fs = require('fs');

const rimraf = require('rimraf');
const RegularExpressions = require('../../../models/utils/RegularExpressions');

module.exports.GetProductsListAction = async ( req , res )=>{

    try{

        let products = await Product.find({
            //limit: 10,
            //offset: 0
            skip: 0,
            limit: 2
        });

        res.render('products/products-list' , { 'products': products });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.AddNewProductAction = async (req , res)=>{

    let attributes = await ProductAttributes.find();
    let categories = await Category.find();

    res.render('products/new-product' , { attributes: attributes , categories: categories });

};

module.exports.GetAttributesAction = async (req , res  )=>{

    try{

        let attributes = await ProductAttributes.find({
            //limit: 10,
            //offset: 0,
            skip: 0,
            limit: 10,
            order: [
                ['attributeID' , 'DESC']
            ]
        });

        res.render('products/attributes/attributes-list' , { 'attributes': attributes });

    }//try
    catch(ex){

        res.render('error' , ex);

    }//catch

};

module.exports.AddNewAttributeAction = async (req , res)=>{

    res.render('products/attributes/new-attribute');

};

module.exports.AddNewAttribute = async ( req , res )=>{

    let response = new Response();

    try{

        let attributeTitle = req.body.attributeTitle;
        //let attributeTitle = req.body.attributeTitle.trim();

        if(!attributeTitle.match(RegularExpressions.CategoryTitleExpression)){

            response.code = 400;
            response.message = 'Название атрибута имеет неверный формат!';
            response.data = attributeTitle;

            return res.send(response);

        }//if

        let newAttribute = await ProductAttributes.create({
            attributeTitle: attributeTitle
        });

        response.code = 200;
        response.message = 'Атрибут успешно добавлен';
        response.data = newAttribute;

        res.send(response);


    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch
};

module.exports.AddNewProduct = async ( req , res )=>{

    let response = new Response();

    try{

        let productTitle = req.body.productTitle;
        let productDescription = req.body.productDescription;
        let productPrice = req.body.productPrice;
        let categories = JSON.parse(req.body.categories);
        let attributes = JSON.parse(req.body.attributes);

        let newProduct = await Product.create({
            'productTitle': productTitle,
            'productDescription': productDescription,
            'productPrice': productPrice,
        });


        for ( let i = 0 ; i < categories.length ; i++ ){

            await Product.create({
                'productID': newProduct.productID,
                'categoryID': categories[i]
            });


        }//for i

        for ( let i = 0 ; i < attributes.length ; i++ ){

            await Product.create({
                'productID': newProduct.productID,
                'attributeID': attributes[i].attributeID,
                'attributeValue': attributes[i].attributeValue
            });

        }//for i

        //Начало работы с загруженным файлом
        if( req.files ){

           let productImage = req.files.image;
           let path = `public/images/${newProduct.productID}`;

           try{

               fs.mkdirSync(path);

           }//try
           catch(ex){ }

           // fs.existsSync()
           productImage.mv( `${path}/${productImage.name}` ,async function(err) {

                if (err){
                    console.log('FILE UPLOAD ERROR:' , err);
                    return;
                }//if

                await Product.create({
                    'productID': newProduct.productID,
                    'img': `/admin/images/${newProduct.productID}/${productImage.name}`
                });

            });

        }//if

        response.code = 200;
        response.message = 'Товар успешно добавлен!';
        response.data = newProduct;

    }//try
    catch(ex){

        console.log(ex);

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        response.data = null;

    }//catch

    res.status(response.code);
    res.send(response);

};

module.exports.UpdateProduct = async ( req , res )=>{

    let response = new Response();

    try{

        let productID = req.params.id;

        let product = await Product.findById(productID);

        if(!product ){

            response.code = 404;
            response.message = 'Товар не найден!';
            response.data = productID;
            res.status(response.code);

            return res.send(response);

        }//if

        let productTitle = req.body.productTitle;
        let productDescription = req.body.productDescription;
        let productPrice = req.body.productPrice;
        let categories = JSON.parse(req.body.categories);
        let attributes = JSON.parse(req.body.attributes);

        await Product.destroy({
            where: {
                productID: productID
            }
        });

        await Product.destroy({
            where: {
                productID: productID
            }
        });

        for ( let i = 0 ; i < categories.length; i++ ){

            await Product.create({

               productID: productID,
               categoryID: categories[i]

            });

        }//for i

        for ( let i = 0 ; i < attributes.length; i++ ){

            let attribute = attributes[i];

            await Product.create({

                productID: productID,
                attributeID: attribute.attributeID,
                attributeValue: attribute.attributeValue

            });

        }//for i

        // await Product.update({
        //     productTitle: productTitle,
        //     productPrice: productPrice,
        //     productDescription: productDescription
        // },{
        //     where:{
        //         productID: productID
        //     }
        // });

        await product.update({
            productTitle: productTitle,
            productPrice: productPrice,
            productDescription: productDescription
        });

        //Начало работы с загруженным файлом
        if( req.files ){

            let productImage = req.files.image;
            let path = `public/images/${productID}`;

            let pImage = await Product.findOne({
                where: {
                    productID: productID
                }
            });

            if(!pImage){

                try{
                    fs.mkdirSync(path);
                }//try
                catch(ex){
                    console.log(ex);
                }//catch


            }//if
            else{
                try{
                    fs.unlinkSync(`public/${pImage.img}`);
                }
                catch(ex){
                    console.log(ex);
                }


            }//else


            // fs.existsSync()
            productImage.mv( `${path}/${productImage.name}` ,async function(err) {

                if (err){
                    console.log('FILE UPLOAD ERROR:' , err);
                    return;
                }//if

                await Product.destroy({
                    where:{
                        'productID': productID,
                    }
                });

                await Product.create({
                    'productID': productID,
                    'img': `/admin/images/${productID}/${productImage.name}`
                });

            });

        }//if

        response.code = 200;
        response.message = 'Товар успешно обновлен!';

    }//try
    catch(ex){

        response.code = 500;
        response.message = 'Внутренняя ошибка сервера!';
        console.log(ex);

    }//catch

    res.status(response.code);
    res.send(response);

};

module.exports.GetProductAction = async ( req , res )=>{

    try{

        let product = await Product.findById( req.params.id , {
            include: [
                {
                    model: Category,
                    as: 'categories',
                    //attributes: { exclude: ['categoryTitle'] },
                },
                {
                    model: ProductAttributes
                }
            ]
        });

        //return res.send(product);

        if( !product ){
            throw new Error('Product not found!');
        }//if

        product.image = await Product.findOne({
            where: {
                productID: product.productID
            }
        });

        let attributes = await ProductAttributes.find();
        let categories = await Category.find();

        res.render('products/single-product' , {product: product , attributes: attributes, categories: categories });

    }//try
    catch(ex){
        res.render('error' , { error: ex });
    }//catch

};

module.exports.RemoveProduct = async ( req , res )=>{

    let response = new Response();

    try{

        let productID = +req.body.productID;

        if( isNaN(productID) ){

            response.code = 400;
            response.message = 'ID продукта задан не верно!';
            response.data = productID;

            return res.send(response);

        }//if

        let product = await Product.findById(productID);

        if(!product){

            response.code = 404;
            response.message = 'Продукт не найден!';
            response.data = productID;

            return res.send(response);


        }//if

        let productImage = await Product.findOne({
            where:{
                productID : productID
            }
        });

        if(productImage){

            let path = `public/images/${productID}`;
            rimraf.sync(path);
            await productImage.destroy();

        }//if

        await product.destroy();

        response.code = 200;
        response.message = 'Продукт успешно удален';

        res.send(response);

    }//try
    catch(ex){


        response.code = 500;
        response.message = 'Внутренняя ошибка сервера';
        response.data = ex;

        res.send( response );

    }//catch

};
