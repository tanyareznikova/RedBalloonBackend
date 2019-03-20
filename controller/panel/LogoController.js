"use strict";

var Logo = require("../../models/logo.js");
var express = require("express");
var app = express(app);
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser");
var fs = require("fs");
var mongoose = require('mongoose');
const controller = express();

controller.getImages = function(callback, limit) {

    Logo.find(callback).limit(limit);
};


controller.getImageById = function(id, callback) {

    Logo.findById(id, callback);

};

controller.addImage = function(image, callback) {
    Logo.create(image, callback);
    //Logo.save(image, callback);
};

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});


controller.getImg = (function(req, res, next) {
    res.render('../views/logo/index.ejs');
});
//upload.any()
controller.postImg = ( upload.any(), function(req, res, next) {

    /*req.files has the information regarding the file you are uploading...
    from the total information, i am just using the path and the imageName to store in the mongo collection(table)
    */
    //res.send(req.files);
    if (req.files) return res.send(req.files);

    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    //next();

    var imagepath = {};
    imagepath['path'] = path;
    imagepath['originalname'] = imageName;
/*
    const img = new Logo({path: path,
        originalname: imageName
    });

    img.save(function(err) {
        if(err) return console.log(err);
        //req.send(req.files);
        res.send(img);

    });
    */
    //imagepath contains two objects, path and the imageName
    //we are passing two objects in the addImage method.. which is defined above..

    controller.addImage(imagepath, function(err) {

    });

});
//======================================================================================

controller.getImgById = (function(req,res){
    Logo.findById(req.params.id,function(err,file){
        if (err) {
            throw err;
        }
        console.log(file);
        console.log(file.path);
        res.render("../views/logo/home.ejs",{image: file.path});

    });
});

//======================================================================================

controller.getPictures = (function(req, res) {
//calling the function from index.js class using routes object..
    controller.getImages(function(err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);

    });
});

controller.getPicture = ( function(req, res) {

//calling the function from index.js class using routes object..
    controller.getImageById(req.params.id, function(err, genres) {
        if (err) {
            throw err;
        }
//res.download(genres.path);
        res.send(genres.path)
    });
});

module.exports = controller;


