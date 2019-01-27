//Мультимедиа
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MultimediaCharacteristicsSchema = new Schema(
    {

        //Аудиоплеер
        audioPlayer: {type: String, required: true, enum: ['да', 'нет']},
        //Видеоплеер
        videoPlayer: {type: String, required: true, enum: ['да', 'нет']},
        //Аудиоразъем
        audioJack: {type: String, required: true},

    }
);

// Виртуальное свойство - URL автора
MultimediaCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/multimediaCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('MultimediaCharacteristics', MultimediaCharacteristicsSchema);
