//Категория

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        //categoryTitle: {type: String, required: true, max: 100, array: ['Все телефоны', 'Android', 'iPhone', 'Huawei']},
        categoryTitle: {type: String, required: true},
        //categoryTitle: String,
        //productID: [{type: Schema.ObjectId, ref: 'Product', required: true}],
        //productID: [{type: Schema.ObjectId, ref: 'CategoryAndProduct', required: true}],

    }
);

// Виртуальное свойство - URL автора
CategorySchema
    .virtual('url')
    .get(function () {
        return '/categories/category' + this._id;
    });

//Export model
module.exports = mongoose.model('Category', CategorySchema);