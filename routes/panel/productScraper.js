var express = require("express");
var router = express.Router();
var ProductScraper = require("../../controller/panel/NewProductScraperController.js");



router.get('/productScraper', ProductScraper.getAllPosts);
router.post('/productScraper/saved', ProductScraper.getAllSavedPosts);
router.get('/productScraper/delete', ProductScraper.getDeletePosts);
router.get('/productScraper/save-post/:id', ProductScraper.getSavePostsById);
router.get('/productScraper/scrape/:category', ProductScraper.getScrapeCategory);
router.get('/productScraper/posts/:id', ProductScraper.getPostsById);
router.post('/productScraper/posts/:id', ProductScraper.postNewPosts);
router.get('/productScraper/delete-post/:id', ProductScraper.getDeleteReviews);

module.exports = router;
