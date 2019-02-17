//Товар

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//import ProductAttribute from "../models/productAttribute";
var ProductAttribute = require("../models/productAttribute");

var ProductSchema = new Schema(
    {
        //продукт
        title: {type: String, required: true},
        //категория
        categoryID: [{type: Schema.ObjectId, ref: 'Category', required: true}],
        //цена
        price: {type: Number, required: true},
        //количество
        quantity: {type: Number, required: true},
        //описание
        description: {type: String, required: true},
        //атрибут товара
        //productAttribute: [ProductAttribute],
        //картинки
        img: [{data: Buffer, contentType: String}],

    }
);

// Виртуальное свойство - URL автора
ProductSchema
    .virtual('url')
    .get(function () {
        return '/catalog/product/' + this._id;
    });

//Export model
module.exports = mongoose.model('Product', ProductSchema);