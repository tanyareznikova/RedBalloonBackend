const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//const autoIncrement = require('mongoose-auto-increment');

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ""
    }
});

//imageSchema.plugin(autoIncrement.plugin, 'images_data');
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
