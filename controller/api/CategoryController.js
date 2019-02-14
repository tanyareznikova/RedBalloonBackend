
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
//import Category from "/models/category";
//import Category from "../../models/category.js";

var Cetegory = require("../../models/category.js");
//const find = require("mongoose").find;

//var mongoose = require("mongoose");
//var Category = mongoose.model("Category", CategorySchema);

//npm install request cheerio

/*
var categoryController = {};

//Add show list of category function
categoryController.categories = function(req, res) {
    Category.find({}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/categories", {categories: categories});
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
            res.render("../views/categories", {category: category});
        }
    });
};

//Add create employee function
categoryController.create = function(req, res) {
    //ИЗМЕНИТЬ
    res.render("../views/categories");
};

//Add save new employee function
categoryController.save = function(req, res) {
    var category = new Category(req.body);

    category.save(function(err) {
        if(err) {
            console.log(err);
            //ИЗМЕНИТЬ
            res.render("../views/categories");
        } else {
            console.log("Successfully created an employee.");
            res.redirect("/categories/"+category._id);
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
            res.render("../views/categories", {category: category});
        }
    });
};

//Add update employee function for updating currently edited employee
categoryController.update = function(req, res) {
    Category.findByIdAndUpdate(req.params.id, { $set: { title: req.body.categoryTitle}}, { new: true }, function (err, category) {
        if (err) {
            console.log(err);
            //ИЗМЕНИТЬ
            res.render("../views/categories", {category: req.body});
        }
        res.redirect("/categories/"+category._id);
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
            console.log("Category deleted!");
            res.redirect("/categories");
        }
    });
};
*/

// Display list of all Categories.
exports.category_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Category list: ' + req.params.id);
    /*
    Category.find({}).exec(function (err, categories) {
    //find({Category}).exec(function (err, categories) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            //ИЗМЕНИТЬ
            res.render("../views/categories", {categories: categories});
        }
    });
    */
};

// Display detail page for a specific Category.
exports.category_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
};

// Display Category create form on GET.
exports.category_create_get = function(req, res) {
    //res.send('NOT IMPLEMENTED: Category create GET');
    res.render('categories', { title: 'Создание категории' });
};

// Handle Category create on POST.
exports.category_create_post = [
    //res.send('NOT IMPLEMENTED: Category create POST');
    // Validate that the name field is not empty.
    body('categoryTitle', 'Category name required').isLength({ min: 1 }).trim(),

        // Sanitize (trim and escape) the name field.
        sanitizeBody('categoryTitle').trim().escape(),

        // Process request after validation and sanitization.
        (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('categories', { title: 'Создание категории', categoryTitle: category, errors: errors.array()});
                return;
            }

            else {
                // Data from form is valid.
                // Check if Genre with same name already exists.

                // Create a category object with escaped and trimmed data.
                var category = new Category(
                    {categoryTitle: req.body.categoryTitle}
                );

                category.save(function (err) {
                    if (err) { return next(err); }
                    // Successful - redirect to new author record.
                    res.redirect(category.url);
                });
/*
                Category.findOne({ 'categoryTitle': req.body.categoryTitle })
                    .exec( function(err, found_category) {
                        if (err) { return next(err); }

                        if (found_category) {
                            // Genre exists, redirect to its detail page.
                            res.redirect(found_category.url);
                        }
                        else {

                            category.save(function (err) {
                                if (err) { return next(err); }
                                // Genre saved. Redirect to genre detail page.
                                res.redirect(category.url);
                            });

                        }

                    });
                    */
            }
        }
];

// Display Category delete form on GET.
exports.category_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST.
exports.category_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.category_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST.
exports.category_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category update POST');
};

//module.exports = categoryController;