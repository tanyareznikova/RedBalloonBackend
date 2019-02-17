//Система
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SystemCharacteristicsSchema = new Schema(
    {

        //Операционная система
        operatingSystem: {type: String, required: true},
        //Навигация
        navigation: [{type: String, required: true}],

    }
);

// Виртуальное свойство - URL автора
SystemCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/systemCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('SystemCharacteristics', SystemCharacteristicsSchema);