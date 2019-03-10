var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = new Schema(
    {

        //картинки
        //img: [{data: Buffer, contentType: String}],
        path: {type: String, required: true, trim: true},
        originalname: {type: String, required: true},

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
ImageSchema
    .virtual('url')
    .get(function () {
        return '/catalog/image/' + this._id;
    });

//Export model
module.exports = mongoose.model('Image', ImageSchema);
