//Где купить

var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var WhereCanOneBuySchema = new Schema(
    {

        //продукт
        productID: [{type: Schema.ObjectId, ref: 'Product', required: true}],
        productTitle: {type: String, required: true, trim: true, index: true, unique:true},
        productPrice: {type: Number, required: true},
        //ссылка на магазин
        linkToStore: [{data: Buffer, contentType: String}],
        //лого магазина
        storeLogo: [{data: Buffer, contentType: String}],

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
WhereCanOneBuySchema
    .virtual('url')
    .get(function () {
        return '/catalog/whereCanOneBuy/' + this._id;
    });

//Export model
module.exports = mongoose.model('WhereCanOneBuy', WhereCanOneBuySchema);
