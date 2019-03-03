//Категория

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        //categoryTitle: {type: String, required: true, max: 100, array: ['Все телефоны', 'Android', 'iPhone', 'Huawei']},
        categoryTitle: {type: String, required: true, trim: true, unique:true},
        //categoryTitle: String,
        //productID: [{type: Schema.ObjectId, ref: 'Product', required: true}],
        //productID: [{type: Schema.ObjectId, ref: 'CategoryAndProduct', required: true}],

    },
    //{ _id: false },
    //{unique:true},
    {timestamps: true}
);

// Виртуальное свойство - URL автора
CategorySchema
    .virtual('url')
    .get(function () {
        return '/categories/categoryList' + this._id;
    });

//Export model
module.exports = mongoose.model('Category', CategorySchema);