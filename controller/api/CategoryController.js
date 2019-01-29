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

//Add create employee function
categoryController.create = function(req, res) {
    //ИЗМЕНИТЬ
    res.render("../views/employees/create");
};

//Add save new employee function
categoryController.save = function(req, res) {
    var category = new Category(req.body);

    category.save(function(err) {
        if(err) {
            console.log(err);
            //ИЗМЕНИТЬ
            res.render("../views/employees/create");
        } else {
            console.log("Successfully created an employee.");
            res.redirect("/employees/show/"+employee._id);
        }
    });
};

//Add edit employee by id function
categoryController.edit = function(req, res) {
    Category.findOne({_id: req.params.id}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/employees/edit", {categories: categories});
        }
    });
};

//Add update employee function for updating currently edited employee
categoryController.update = function(req, res) {
    Category.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            //ИЗМЕНИТЬ
            res.render("../views/employees/edit", {employee: req.body});
        }
        res.redirect("/employees/show/"+employee._id);
    });
};

//Add delete employee by id function for remove single employee data
categoryController.delete = function(req, res) {
    Category.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            //ИЗМЕНИТЬ
            console.log("Employee deleted!");
            res.redirect("/employees");
        }
    });
};

module.exports = categoryController;