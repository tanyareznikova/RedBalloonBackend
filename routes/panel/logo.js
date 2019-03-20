"use strict";

//var Logo = require("../../models/logo.js");
var express = require("express");
var app = express(app);
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser");
var fs = require("fs");
var mongoose = require('mongoose');
const Logo = require("../../controller/panel/LogoController.js");



router.get('/logo', Logo.getImg);
router.post('/logo', Logo.postImg);
router.get('/logo/picture/:id', Logo.getImgById);
router.get('/logo/image', Logo.getPictures);
router.get('/logo/image/:id', Logo.getPicture);

module.exports = router;
