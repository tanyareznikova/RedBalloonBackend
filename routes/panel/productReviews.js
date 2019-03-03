"use strict";

const express = require('express');
const FeedBackController = require("../../controller/api/ProductReviewsController");

const router = express.Router();


router.get('/productReviews-list', FeedBackController.getProductReviews );
router.get('/single-productReviews/:id' , FeedBackController.getProductReviewByID);
router.put('/productReviews/:id', FeedBackController.ProcessedFeedBack );
router.post('/productReviews-response/', FeedBackController.SendMessage );


module.exports = router;