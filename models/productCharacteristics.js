//Характеристика товара

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductCharacteristicsSchema = new Schema(
    {

            //продукт
        //productID: {type: Schema.ObjectId, ref: 'Product', required: true},
            //связь
        bindingCharacteristicsID: {type: Schema.ObjectId, ref: 'BindingCharacteristics', required: true},
            //дисплей
        displayCharacteristicsID: {type: Schema.ObjectId, ref: 'DisplayCharacteristics', required: true},
            //фотокамера
        cameraCharacteristicsID: {type: Schema.ObjectId, ref: 'CameraCharacteristics', required: true},
            //процессор
        cpuCharacteristicsID: {type: Schema.ObjectId, ref: 'CPUcharacteristics', required: true},
            //память
        memoryCharacteristicsID: {type: Schema.ObjectId, ref: 'MemoryCharacteristics', required: true},
            //мультимедиа
        multimediaCharacteristicsID: {type: Schema.ObjectId, ref: 'MultimediaCharacteristics', required: true},
            //система
        systemCharacteristicsID: {type: Schema.ObjectId, ref: 'SystemCharacteristics', required: true},
            //сим-карта
        simCardCharacteristicsID: {type: Schema.ObjectId, ref: 'SimCardCharacteristics', required: true},
            //питание
        supplyCharacteristicsID: {type: Schema.ObjectId, ref: 'SupplyCharacteristics', required: true},
            //корпус
        bodyCharacteristicsID: {type: Schema.ObjectId, ref: 'BodyCharacteristics', required: true},
            //прочее
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

const Attribute = {
        name: 'string',
        value: 'string'
};

mongoose.model('Attribute' , Attribute);

const Product = {
        //...
        attributes: {
                collection: 'Attribute',
                type: 'array'
        }

};


mongoose.model('Product' , Product);

const camera = new Attribute('Камера');
const camera = new Attribute('Камера');
const camera = new Attribute('Камера');
const camera = new Attribute('Камера');
const camera = new Attribute('Камера');
const camera = new Attribute('Камера');
const camera = new Attribute('Камера');

const sony = new Product();
//sony.attributes.push(camera , '12mp');
//sony.attributes.push(color , 'red');
//sony.attributes.push( corpus , 'steel' );

//sony.save();