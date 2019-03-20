// Логотип

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogoSchema = new Schema(
    {

        path: {
            type: String,
            required: true,
            trim: true
        },
        originalname: {
            type: String,
            required: true
        }

    },
    //{ _id: false },
    {timestamps: true}
);

// Виртуальное свойство - URL автора
LogoSchema
    .virtual('url')
    .get(function () {
        return '/catalog/logo/' + this._id;
    });

//Export model

//var Image = module.exports = mongoose.model('images', LogoSchema);
module.exports = mongoose.model('Logo', LogoSchema);
