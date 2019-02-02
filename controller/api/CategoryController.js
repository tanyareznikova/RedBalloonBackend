/*
"scripts": {
    "start": "node ./bin/www"
    или
    "watch": "nodemon ./start.js"
},
*/
//block content
//h1= title
//p Welcome to #{title}
/*script.
      window.jQuery || document.write('script src="/node_modules/jquery/dist/jquery.slim.min.js"')
    script(src="/docs/4.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-zDnhMsjVZfS3hiP7oCBRmfjkQC4fzxVxFhBx8Hkz2aZX8gEvA/jsP3eXRCvzTofP" crossorigin="anonymous")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js")
    script(src="dashboard.js")
    link(href="/docs/4.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous")
    */

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
    Category.findOne({_id: req.params.id}).exec(function (err, category) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/employees/show", {category: category});
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
            res.redirect("/employees/show/"+category._id);
        }
    });
};

//Add edit employee by id function
categoryController.edit = function(req, res) {
    Category.findOne({_id: req.params.id}).exec(function (err, category) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/employees/edit", {category: category});
        }
    });
};

//Add update employee function for updating currently edited employee
categoryController.update = function(req, res) {
    Category.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, category) {
        if (err) {
            console.log(err);
            //ИЗМЕНИТЬ
            res.render("../views/employees/edit", {category: req.body});
        }
        res.redirect("/employees/show/"+category._id);
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