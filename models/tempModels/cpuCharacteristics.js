//Процессор
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CpuCharacteristicsSchema = new Schema(
    {

        //Процессор
        cpu: {type: String, required: true},
        //Частота процессора
        cpuFrequency: {type: Number, required: true},
        //Количество ядер
        numberOfCores: {type: Number, required: true},

    }
);

// Виртуальное свойство - URL автора
CpuCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/cpuCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('CpuCharacteristics', CpuCharacteristicsSchema);