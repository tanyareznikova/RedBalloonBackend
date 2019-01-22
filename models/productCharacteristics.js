//Характеристика товара

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductCharacteristicsSchema = new Schema(
    {

        productID: {type: Schema.ObjectId, ref: 'Product', required: true},
        bindingCharacteristicsID: {type: Schema.ObjectId, ref: 'BindingCharacteristics', required: true},
        displayCharacteristicsID: {type: Schema.ObjectId, ref: 'DisplayCharacteristics', required: true},
        cameraCharacteristicsID: {type: Schema.ObjectId, ref: 'CameraCharacteristics', required: true},
        cpuCharacteristicsID: {type: Schema.ObjectId, ref: 'CPUcharacteristics', required: true},
        memoryCharacteristicsID: {type: Schema.ObjectId, ref: 'MemoryCharacteristics', required: true},
        multimediaCharacteristicsID: {type: Schema.ObjectId, ref: 'MultimediaCharacteristics', required: true},
        systemCharacteristicsID: {type: Schema.ObjectId, ref: 'SystemCharacteristics', required: true},
        simCardCharacteristicsID: {type: Schema.ObjectId, ref: 'SimCardCharacteristics', required: true},
        supplyCharacteristicsID: {type: Schema.ObjectId, ref: 'SupplyCharacteristics', required: true},
        bodyCharacteristicsID: {type: Schema.ObjectId, ref: 'BodyCharacteristics', required: true},
        otherCharacteristicsID: {type: Schema.ObjectId, ref: 'OtherCharacteristics', required: true},

    }
);

// Виртуальное свойство - URL автора
ProductCharacteristicsSchema
    .virtual('url')
    .get(function () {
        return '/catalog/productCharacteristics/' + this._id;
    });

//Export model
module.exports = mongoose.model('ProductCharacteristics', ProductCharacteristicsSchema);