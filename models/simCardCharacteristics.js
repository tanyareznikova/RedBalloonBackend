//СИМ-Карта
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SimCardCharacteristicsSchema = new Schema(
    {

        //SIM-карта
        simCard : {type: String, required: true},
        //Кол-во SIM-карт
        numberOfSIMcards: {type: String, required: true},

    }
);

// Виртуальное свойство - URL автора
SimCardCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/simCardCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('SimCardCharacteristics', SimCardCharacteristicsSchema);