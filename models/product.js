//Товар

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//import ProductAttribute from "../models/productAttribute";
//var ProductAttribute = require("../models/productAttribute");

var ProductSchema = new Schema(
    {
        //продукт
        imgUrl: {type: String},
        title: {type: String, required: true, trim: true, index: true},
        //productIdOnSite: {type: String, trim: true, unique:true},
        //категория
        //categoryID: [{type: Schema.ObjectId, ref: 'Category', required: true}],

            //цена


            price: {type: String, required: true},
        //количество
        //amount: {type: Number, required: true},
        //описание
        //description: {type: String, required: true},

        //description: {type: String, default: "Описание не найдено"},

        //атрибут товара
        //productAttribute:  [{type: Schema.ObjectId, ref: 'ProductAttribute', required: true}],
        //картинки
        //img: [{type: Schema.ObjectId, ref: 'Image', required: true}],
        /*
        img: [{
            path: {type: String, required: true, trim: true},
            originalname: {type: String, required: true}
        }],
        */

        link: {type: String},
        isSaved: {type: Boolean, default: false},
        buttonStatus: { type: String, default: " Сохранить " },
        section: {type: String},
        reviews: [{type: Schema.Types.ObjectId, ref: "ProductReviews"}]

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
ProductSchema
    .virtual('url')
    .get(function () {
        return '/catalog/product/' + this._id;
    });

//Export model
module.exports = mongoose.model('Product', ProductSchema);
