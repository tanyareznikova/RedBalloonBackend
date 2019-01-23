//Корпус
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BodyCharacteristicsSchema = new Schema(
    {

        //Высота
        height: {type: String, required: true},
        //Ширина
        width: {type: String, required: true},
        //Толщина
        thickness: {type: String, required: true},
        //Вес
        weight: {type: String, required: true},
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