var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;
/*
 * Scraper Constructor
**/
function Scraper (url) {
    this.url = url;
    this.init();
}
/*
 * Make it an EventEmitter
**/
util.inherits(Scraper, EventEmitter);

/*
 * Initialize scraping
**/
Scraper.prototype.init = function () {
    var model;
    var self = this;
    self.on('loaded', function (html) {
        model = self.parsePage(html);
        self.emit('complete', model);
    });
    self.loadWebPage();
};

Scraper.prototype.loadWebPage = function () {
    var self = this;
    console.log('\n\nLoading ' + website);
    http.get(self.url, function (res) {
        var body = '';

        if(res.statusCode !== 200) {
            return self.emit('error', STATUS_CODES[res.statusCode]);
        }
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            self.emit('loaded', body);
        });
    })
        .on('error', function (err) {
            self.emit('error', err);
        });
};
/*
 * Parse html and return an object
**/
Scraper.prototype.parsePage = function (html) {
    var $ = cheerio.load(html);
    var title = $('#title').text();
    var categoryID = $('#categoryID').text();
    var price = $('#price').text();
    var amount = $('#amount').text();
    var description = $('#description').text();
    var productAttribute = $('#productAttribute').text();
    var img = $('#img').text();
    var model = {
        title: title.trim().split('\n'),
        categoryID: categoryID.trim(),
        price: price.trim().split('\n'),
        amount: amount.trim().split('\n'),
        description: description.trim().split('\n'),
        productAttribute: productAttribute.trim().split('\n'),
        img: img.trim().split('\n'),
    };
    return model;
};
module.exports = Scraper;