var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/productsRoutes');
var categoriesRouter = require('./routes/categoriesRoutes');
var bindingCharacteristicsRouter = require('./routes/bindingCharacteristicsRoutes');
var bodyCharacteristicsRouter = require('./routes/bodyCharacteristicsRoutes');
var cameraCharacteristicsRouter = require('./routes/cameraCharacteristicsRoutes');
var cpuCharacteristicsRouter = require('./routes/cpuCharacteristicsRoutes');
var displayCharacteristicsRouter = require('./routes/displayCharacteristicsRoutes');
var memoryCharacteristicsRouter = require('./routes/memoryCharacteristicsRoutes');
var multimediaCharacteristicsRouter = require('./routes/multimediaCharacteristicsRoutes');
var otherCharacteristicsRouter = require('./routes/otherCharacteristicsRoutes');
var productCharacteristicsRouter = require('./routes/productCharacteristicsRoutes');
var productReviewsRouter = require('./routes/productReviewsRoutes');
var simCardCharacteristicsRouter = require('./routes/simCardCharacteristicsRoutes');
var supplyCharacteristicsRouter = require('./routes/supplyCharacteristicsRoutes');
var systemCharacteristicsRouter = require('./routes/systemCharacteristicsRoutes');
var whereCanOneBuyRouter = require('./routes/whereCanOneBuyRoutes');

var app = express();


//Express and Mongoose
//Устанавливаем соединение с mongoose
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/RedBalloonDB';

// img path
//var imgPathToProduct = 'C:\\images\\img.png';
// img path

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/productsRoutes', productsRouter);
app.use('/categoriesRoutes', categoriesRouter);
app.use('/bindingCharacteristicsRoutes', bindingCharacteristicsRouter);
app.use('/bodyCharacteristicsRoutes', bodyCharacteristicsRouter);
app.use('/cameraCharacteristicsRoutes', cameraCharacteristicsRouter);
app.use('/cpuCharacteristicsRoutes', cpuCharacteristicsRouter);
app.use('/displayCharacteristicsRoutes', displayCharacteristicsRouter);
app.use('/memoryCharacteristicsRoutes', memoryCharacteristicsRouter);
app.use('/multimediaCharacteristicsRoutes', multimediaCharacteristicsRouter);
app.use('/otherCharacteristicsRoutes', otherCharacteristicsRouter);
app.use('/productCharacteristicsRoutes', productCharacteristicsRouter);
app.use('/productReviewsRoutes', productReviewsRouter);
app.use('/simCardCharacteristicsRoutes', simCardCharacteristicsRouter);
app.use('/supplyCharacteristicsRoutes', supplyCharacteristicsRouter);
app.use('/systemCharacteristicsRoutes', systemCharacteristicsRouter);
app.use('/whereCanOneBuyRoutes', whereCanOneBuyRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
