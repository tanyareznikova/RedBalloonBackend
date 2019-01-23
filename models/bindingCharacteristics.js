//Связь
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BindingCharacteristicsSchema = new Schema(
    {

        lte: [{type: String, required: true}],
        internet: [{type: String, required: true}],
        bluetooth: [{type: String, required: true}],
        wiFi: [{type: String, required: true}],
        nfc: {type: String, required: true, enum: ['да', 'нет']},
        //Разъем для синхронизации
        syncConnector : {type: String, required: true},

    }
);

// Виртуальное свойство - URL автора
BindingCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bindingCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('BindingCharacteristics', BindingCharacteristicsSchema);
