//Корпус
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BodyCharacteristicsSchema = new Schema(
    {

        //Высота
        height: {type: Decimal128, required: true},
        //Ширина
        width: {type: Decimal128, required: true},
        //Толщина
        thickness: {type: Decimal128, required: true},
        //Вес
        weight: {type: Number, required: true},
        //Материал корпуса
        bodyMaterial: [{type: String, required: true}],
        //Цвет
        color: [{type: String, required: true}],

    }
);

// Виртуальное свойство - URL автора
BodyCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bodyCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('BodyCharacteristics', BodyCharacteristicsSchema);