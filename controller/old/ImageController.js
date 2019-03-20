const path = require("path");
const express = require("express");
const router = express.Router();
// multer to handle processing of uploaded files
const multer = require("multer");
// uuid for creating unique ids for uploaded files
const uuid = require('uuid/v4');
// jimp for image resizing
const jimp = require("jimp");
const Image = require("../../models/imageModel");
// TODO Ability to delete images

// MULTER SETUP
multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter: function(req, file, next) {
        const isPhoto = file.mimetype.startsWith("image/");
        if (isPhoto) {
            next(null, true);
        } else {
            next({error: "That image type isn\'t allowed."}, false);
        }
    },
};

// Image Uploading Middleware
const upload = multer(multerOptions).single("image");

const saveToDisk = function(req, res, next) {
    if(!req.file) {
        next();
        return;
    }
    // creates the unique file name for the uploaded image
    const extension = req.file.mimetype.split("/")[1];
    req.body.photo = `${uuid.v4}.${extension}`;

    // stores the actual image to disk in server after it has been resized
    const photo = req.file.buffer;
    jimp.read(req.file.buffer, function(err, photo) {
        if (err) throw err;
        photo
            .resize(800, jimp.AUTO)
            //.write(`../public/uploads/${req.body.photo}`);
            .write(`../../public/images/uploads/${req.body.photo}`);
    });

    next();
};

const sendToDatabase = function (req, res, next) {
    if (!req.body.photo) {
        res.redirect("/image/gallery");
        return;
    }
    const imgUrl = path.join(req.body.photo);

    Image.create({
        image: imgUrl
    }, function(err, data) {
        console.log("Save uploaded image to database!");
    });

    next();
};

module.exports = {
    upload,
    saveToDisk,
    sendToDatabase
};
