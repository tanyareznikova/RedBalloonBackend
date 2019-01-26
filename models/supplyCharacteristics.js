//Питание
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SupplyCharacteristicsSchema = new Schema(
    {

        //Тип аккумулятора
        batteryType: {type: String, required: true},
        //Поддержка технологии быстрой зарядки
        fastCharging: {type: String, required: true, enum: ['да', 'нет']},
        //Аккумулятор
        battery: {type: Number, required: true},

    }
);

// Виртуальное свойство - URL автора
SupplyCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/supplyCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('SupplyCharacteristics', SupplyCharacteristicsSchema);
