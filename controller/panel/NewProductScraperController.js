var express = require("express");
var router = express.Router();
var Product = require("../../models/product");
var ProductReviews = require("../../models/productReviews");
var post = require("../../public/javascripts/seed/post-seeder");

const controller = express();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

/* GET home page. */
controller.getAllPosts = (function(req, res, next) {
    Product.find({})
        .sort([["createdAt", -1]])
        .exec(function(err, docs) {
            var totalArticles = docs.length;
            var articleChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                articleChunks.push(docs.slice(i, i + chunkSize));
            }

            res.render("../views/productScraper/shop.pug", {
                title: "СВЯЗНОЙ + ",
                articles: articleChunks,
                qty: totalArticles,
                //post: post
                products: docs
            });
        });
});

controller.getAllSavedPosts = (function(req, res, next) {
    Product.find({ isSaved: true })
        .sort([["createdAt", -1]])
        .exec(function(err, docs) {
            var totalSavedArticles = docs.length;
            var articleChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                articleChunks.push(docs.slice(i, i + chunkSize));
            }

            res.render("../views/productScraper/saved.pug", {
                title: "Сохраненные",
                articles: articleChunks,
                qty: totalSavedArticles,
                //post: post
                products: docs
            });
        });
});

//each item in newPost
//each newProduct in products

// Clean up databased by removing unsaved articles
controller.getDeletePosts = (function(req, res, next) {
    Product.deleteMany({ isSaved: false }, function(err, data) {
        if (err) return handleError(err);
        res.redirect("/panel/productScraper");
    });
});

controller.getSavePostsById = ( function(req, res) {
    var productID = req.params.id;
    Product.findById(productID, function(err, article) {
        if (article.isSaved) {
            Product.findByIdAndUpdate(
                // id
                req.params.id,
                // update
                { isSaved: false, buttonStatus: "Сохранить" },
                // options:  set 'new' to 'true' to return the modified document rather than the original
                { new: true },
                // callback
                function(err, data) {
                    res.redirect("/panel/productScraper");
                }
            );
        } else {
            Product.findByIdAndUpdate(
                // id
                req.params.id,
                // update
                { isSaved: true, buttonStatus: "Удалить" },
                // option
                { new: true },
                // callback
                function(err, data) {
                    res.redirect("../views/productScraper/saved.pug");
                }
            );
        }
    });
});

controller.getScrapeCategory = ( function(req, res) {
    var section = req.params.section;
    var categoryUrl = "";

        switch (section) {
            case "all":
                categoryUrl = "https://www.svyaznoy.ru/catalog/phone/225";
                //categoryUrl = "https://www.mvideo.ru/smartfony-i-svyaz/smartfony-205?reff=menu_main";
                break;
            case "huawei":
                categoryUrl = "https://www.svyaznoy.ru/catalog/phone/225/huawei";
                break;
            case "honor":
                categoryUrl = "https://www.svyaznoy.ru/catalog/phone/225/honor";
                break;
            case "apple":
                categoryUrl = "https://www.svyaznoy.ru/catalog/phone/225/apple";
                break;
            case "samsung":
                categoryUrl = "https://www.svyaznoy.ru/catalog/phone/225/samsung";
                break;
            default:
            // code block
        }//switch

    axios.get(categoryUrl).then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var result = {};
        $("div.b-offer-conteiner__inner").each(function(i, element) {
            var imgUrl = $(element)
                .parent()
                .find("div.slick-offer-img__slide")
                .find("img")
                .attr("src");
            var title = $(element)
                .find("h1.b-offer-title")
                .text()
                .trim();
            /*
            var productIdOnSite = $(element)
                .find("div.data-key")
                .text()
                .trim();
                */
            var price = $(element)
                .find("div.b-offer-box__price")
                .text()
                .trim();
            var link = $(element)
                .find("a")
                .attr("href");
            var baseURL = "https://www.svyaznoy.ru";
            result.link = baseURL + link;
            result.title = title;
            //result.productIdOnSite = productIdOnSite;
            //result.category = "Все смартфоны";
            if (price) {
                result.price = price;
            }
            if (imgUrl) {
                result.imgUrl = imgUrl;
            } else {
                result.imgUrl =
                    "https://via.placeholder.com/307x224.jpg?text=No%20Image%20from%20Svyaznoy";
            }
            if (section !== "all") {
                result.section = section;
            } else {
                result.section = "Все смартфоны";
            }
            // Create a new Article using the `result` object built from scraping
            Product.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log("---------------------------");
                    console.log("View the added result in the console", dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        console.log("Scrape Complete");
        res.redirect("/panel/productScraper");
    });


});

// Route for grabbing a specific Article by id, populate it with it's note
controller.getPostsById = (function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Product.findOne({ _id: req.params.id })
    // ..and populate all of the comments associated with it
        .populate("reviews")
        .then(function(dbArticle) {
            // If there are comments in the article
            var commentsToDisplay = [];

            if (dbArticle.reviews === undefined || dbArticle.reviews.length === 0) {
                commentsToDisplay = [
                    {
                        message: "Your are the first person to comment.",
                        name: "N/A"
                    }
                ];
            } else {
                commentsToDisplay = dbArticle.reviews;
            }

            res.render("../views/productScraper/post.pug", {
                productID: dbArticle._id,
                imgUrl: dbArticle.imgUrl,
                title: dbArticle.title,
                //productIdOnSite: dbArticle.productIdOnSite,
                //description: dbArticle.description,
                price: dbArticle.price,
                section: dbArticle.section,
                link: dbArticle.link,
                reviews: commentsToDisplay,
                isSaved: dbArticle.isSaved,
                buttonStatus: dbArticle.buttonStatus

            });
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Comment
controller.postNewPosts = ( function(req, res) {
    var redirectBackToArticle = `/panel/productScraper/posts/${req.params.id}`;
    var productID = req.params.id;

    // Grab the request body
    var body = req.body;
    // Each property on the body all represent our text boxes in article/index.hbs as specified by the name attribute on each of those input fields
    var res_body = {
        message: body.new_comment_body,
        name: body.new_comment_username,
        productID: productID
    };

    // Create a new note and pass the req.body to the entry
    ProductReviews.create(res_body)
        .then(function(dbComment) {
            // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated Article -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return Product.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reviews: dbComment._id } },
                { new: true }
            );
        })
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.redirect(redirectBackToArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Clean up databased by removing unsaved articles
controller.getDeleteReviews = ( function(req, res, next) {
    var productID = "";

    // Grab article Id from the database
    ProductReviews.findById({ _id: req.params.id }).exec(function(err, doc) {
        console.log(doc);
        productID = doc.productID;

        var redirectBackToArticle = `/panel/productScraper/posts/${productID}`;
        console.log(redirectBackToArticle);

        ProductReviews.deleteOne({ _id: req.params.id }, function(err, data) {
            if (err) return handleError(err);
            res.redirect(redirectBackToArticle);
        });
    });
});

module.exports = controller;
