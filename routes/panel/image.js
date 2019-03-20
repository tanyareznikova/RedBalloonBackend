const path = require("path");
const express = require("express");
const Image = require("../../models/imageModel");
const controller = require("../../controller/old/ImageController");
const router = express.Router();


router.get("/image", function(req, res) {
    res.sendFile(path.join(__dirname, "/../../views/html/index.html"));
});

router.get("/image/form", function(req, res) {
    res.sendFile(path.join(__dirname, "/../../views/html/form.html"));
});

router.get("/image/gallery", function(req, res) {
    res.sendFile(path.join(__dirname, "/../../views/html/gallery.html"));
});


// Find all images
router.get("/image/getImages", function(req, res) {
    Image.find({}, function(err, data) {
        res.json({data});
    });
});


// Upload an image to the database
router.post("/image/uploadImage",
    controller.upload,
    controller.saveToDisk,
    controller.sendToDatabase,
    function(req, res) {
        res.redirect("/image/gallery");
    });


// TODO Build route to delete images
router.delete("/image/:imageId", function (req, res) {
    res.json({status: "Photo deleted!"})
});

module.exports = router;
