//Товар

var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var ProductSchema = new Schema(
    {

        //продукт
        title: {type: String, required: true},
        //категория
        categoryID: [{type: Schema.ObjectId, ref: 'Category', required: true}],
        //цена
        price: {type: String, required: true},
        //количество
        quantity: {type: String, required: true},
        //описание
        description: {type: String, required: true},
        //характеристика товара
        productCharacteristics: {type: Schema.ObjectId, ref: 'ProductCharacteristics', required: true},
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