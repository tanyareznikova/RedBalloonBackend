var mongoose = require("mongoose");
var Category = mongoose.model("Category");

var categoryController = {};

//Add show list of category function
categoryController.list = function(req, res) {
    Category.find({}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/employees/index", {categories: categories});
        }
    });
};

//Add show single category by id function
categoryController.show = function(req, res) {
    Category.findOne({_id: req.params.id}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/employees/show", {categories: categories});
        }
    });
};

