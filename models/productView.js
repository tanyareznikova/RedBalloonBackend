// Просмотр продукта

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//import ProductAttribute from "../models/productAttribute";
//var ProductAttribute = require("../models/productAttribute");

var ProductViewSchema = new Schema(
    {
        //продукт
        productTitle: {type: String, required: true, trim: true, index: true},
        productIdOnSite: {type: String, trim: true, unique:true},
        //категория
        //categoryID: [{type: Schema.ObjectId, ref: 'Category', required: true}],
        //category: {type: String},
        //цена
        price: {type: Number, required: true},
        //количество
        //amount: {type: Number, required: true},
        //описание
        //description: {type: String, required: true},
        description: {type: String, default: "Описание не найдено"},
        //атрибут товара
        attribute: {type: String, default: "Атрибуты не найдены"},
        //productAttribute:  [{type: Schema.ObjectId, ref: 'ProductAttribute', required: true}],
        //картинки
        //img: [{type: Schema.ObjectId, ref: 'Image', required: true}],
        /*
        img: [{
            path: {type: String, required: true, trim: true},
            originalname: {type: String, required: true}
        }],
        */
        images: [{type: String}],
        link: {type: String},
        isSaved: {type: Boolean, default: false},
        buttonStatus: { type: String, default: " Сохранить " },
        reviews: [{type: Schema.Types.ObjectId, ref: "ProductReviews"}]

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
ProductViewSchema
    .virtual('url')
    .get(function () {
        return '/catalog/productView/' + this._id;
    });

//Export model
module.exports = mongoose.model('ProductView', ProductViewSchema);
