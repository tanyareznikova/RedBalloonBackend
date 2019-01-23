//Память
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemoryCharacteristicsSchema = new Schema(
    {

        //Встроенная память
        internalMemory: {type: String, required: true},
        //Оперативная память
        ram: {type: String, required: true},
        //Поддержка карт памяти
        memoryCardSupport: [{type: String, required: true}],
        //Макс. объем карты памяти
        maxMemoryCardCapacity: {type: String, required: true},

    }
);

// Виртуальное свойство - URL автора
MemoryCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/memoryCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('MemoryCharacteristics', MemoryCharacteristicsSchema);