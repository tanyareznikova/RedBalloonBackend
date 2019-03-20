//Отзывы о товаре

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductReviewsSchema = new Schema(
    {

        name: {type: String, required: true, trim: true},
        //plus: {type: String, required: true, trim: true},
        //minus: {type: String, required: true, trim: true},
        message: {type: String, required: true, trim: true},
        //productID: {type: Schema.ObjectId, ref: 'Product', required: true},
        productID: {type: String, required: true}

    },
    //{ _id: false },
    {timestamps: true}
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
