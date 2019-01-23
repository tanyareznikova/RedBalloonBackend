//Дисплей
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DisplayCharacteristicsSchema = new Schema(
    {

        //Тип дисплея
        displayType: {type: String, required: true},
        //Диагональ
        diagonal: {type: String, required: true},
        //Разрешение
        screenResolution: {type: String, required: true},
        //Плотность пикселей
        ppi: {type: String, required: true},
        //Количество цветов дисплея
        numberOfDisplayColors: {type: String, required: true},
        //Сенсорный дисплей
        touchscreen: {type: String, required: true, enum: ['да', 'нет']},
        //Поддержка Multitouch
        multitouch: {type: String, required: true, enum: ['да', 'нет']},

    }
);

// Виртуальное свойство - URL автора
DisplayCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/displayCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('DisplayCharacteristics', DisplayCharacteristicsSchema);
