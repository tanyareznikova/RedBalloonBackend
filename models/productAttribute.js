//Атрибуты товара

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductAttributeSchema = new Schema(
    {

        //название атрибута
        titleAttribute: {type: String, required: true, trim: true, unique:true},
        //значение атрибута
        //valueAttribute: {type: String, required: true},

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
ProductAttributeSchema
    .virtual('url')
    .get(function () {
        return '/catalog/productAttribute/' + this._id;
    });

//Export model
module.exports = mongoose.model('ProductAttribute', ProductAttributeSchema);
