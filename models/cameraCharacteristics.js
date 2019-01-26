//Фотокамера
//Входит в productCharacteristics

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CameraCharacteristicsSchema = new Schema(
    {

        //Фотокамера
        camera: [{type: Number, required: true}],
        //Диафрагма
        diaphragm: {type: String, required: true},
        //Вспышка
        flash: {type: String, required: true},
        //Видеозапись
        videoRecording: {type: String, required: true, enum: ['да', 'нет']},
        //Разрешение видеосъемки
        videoResolution: {type: String, required: true},
        //Фронтальная камера
        frontCamera: [{type: Number, required: true}],

    }
);

// Виртуальное свойство - URL автора
CameraCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/cameraCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('CameraCharacteristics', CameraCharacteristicsSchema);
