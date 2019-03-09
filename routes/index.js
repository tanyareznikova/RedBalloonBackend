var express = require('express');
var router = express.Router();

//var upload    = require('../public/javascripts/upload');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.redirect('/categoriesRoutes');
});

module.exports = router;
