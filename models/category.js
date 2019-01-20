//Категория

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        categoryTitle: {type: String, required: true, max: 100, array: ['Все телефоны', 'Android', 'iPhone', 'Huawei']},
        productID: {type: Schema.ObjectId, ref: 'Category', required: true},

    }
);

// Виртуальное свойство для категории
CategorySchema
    .virtual('name')
    .get(function () {
        return this.categoryTitle;
    });

// Виртуальное свойство - URL автора
CategorySchema
    .virtual('url')
    .get(function () {
        return '/catalog/category/' + this._id;
    });

//Export model
module.exports = mongoose.model('Category', CategorySchema);