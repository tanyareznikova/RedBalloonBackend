//Отзывы о товаре

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductReviewsSchema = new Schema(
    {

        name: {type: String, required: true, max: 100},
        plus: {type: String, required: true},
        minus: {type: String, required: true},
        message: {type: String, required: true},
        productID: {type: Schema.ObjectId, ref: 'Product', required: true},

    }
);

// Виртуальное свойство для отзыва о товаре
ProductReviewsSchema
    .virtual('userMessage')
    .get(function () {
        return this.plus + '\n' + this.minus + '\n' + this.message;
    });

// Виртуальное свойство - URL автора
ProductReviewsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/productReviews/' + this._id;
    });

//Export model
module.exports = mongoose.model('ProductReviews', ProductReviewsSchema);