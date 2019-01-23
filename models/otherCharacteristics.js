//Прочее
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OtherCharacteristicsSchema = new Schema(
    {

        //Датчики
        sensors: [{type: String, required: true}],
        //Сканер отпечатков пальцев
        fingerprintScanner: {type: String, required: true, enum: ['да', 'нет']},
        //Срок гарантии
        guaranteePeriod: {type: String, required: true},
        //Производитель
        manufacturer: {type: String, required: true},
        //Страна производитель
        producingCountry: {type: String, required: true},

    }
);

// Виртуальное свойство - URL автора
OtherCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/otherCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('OtherCharacteristics', OtherCharacteristicsSchema);