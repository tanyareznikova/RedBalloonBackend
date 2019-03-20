//import * as bodyParser from "body-parser";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var multer = require('multer');
//Express and Mongoose
//Устанавливаем соединение с mongoose
var mongoose = require('mongoose');

//const Logo = require("../../../controller//LogoController.js");

//var mongoDB = 'mongodb://localhost:27017/RedBalloonDB';

// img path
//var imgPathToProduct = 'C:\\images\\img.png';
// img path
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/RedBalloonDB', { useNewUrlParser: true })
mongoose.connect('mongodb://localhost:27017/RedBalloonDB', { useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));
mongoose.set('useCreateIndex', true);
//mongoose.connect(mongoDB);
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//const passport = require('passport');

//const Connection = require('./routes/connection');

const indexRouter = require('./routes/index');

const imageRouter = require('./routes/panel/logo');

const productsRoutes = require('./routes/panel/products');
const categoriesRoutes = require('./routes/panel/categories');
//const ordersRoutes = require('./routes/panel/orders');
//const localeRoutes = require('./routes/panel/locale');
//const newsRoutes = require('./routes/panel/news');
//const promoRoutes = require('./routes/panel/promo-codes');
//const coordRoutes = require('./routes/panel/coord');
//const productReviewsRoutes = require('./routes/panel/productReviews');
//const aboutRoutes = require('./routes/panel/about');

const productsApiRoutes = require('./routes/api/products');
//const promocodesApiRoutes = require('./routes/api/promo-codes');
const categoriesApiRoutes = require('./routes/api/categories');
//const feedBackApiRoutes = require('./routes/api/feedback');
//const ordersApiRoutes = require('./routes/api/orders');
//const localeApiRoutes = require('./routes/api/locale');
//const newsApiRoutes = require('./routes/api/news');


//const mapApiRoutes = require('./routes/api/coord');
//const aboutApiRoutes = require('./routes/api/about');

const fileUpload = require('express-fileupload');

const app = express();

//app.use(express.static("public"));
//app.use("/", require("./routes/panel/image"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')(
    {
      secret:'elkflwekflwekfl888ef',
      saveUninitialized: true,
      cookie: {
        maxAge: (1000 * 60 ) * 60, // ms
          // maxAge: (1000 * 60 ) * 60, // ms
        secure: false

      },
        proxy: true,
        resave: true,
    }
));

//app.use(multer({
    //dest: path.join(__dirname, 'public/uploads')}).single('file'));
//app.use('./routes/api/products/uploads/', express.static(path.join(__dirname, '../uploads')));
//app.use('./routes/api/products/uploads', express.static(__dirname + '/uploads'));

//app.use('/picture/uploads', express.static(__dirname + '/uploads'));
app.use('/logo/picture/uploads', express.static(__dirname + '/uploads'));

//app.use('/picture/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

//var imgRoutes = require('./controller/panel/ImagefileController');

//app.use('/panel', imgRoutes);

//app.use(multer());
//app.use(passport.initialize());
//app.use(passport.session());

//app.use( require('connect-flash')() );

//const localStrategy = require('./passport/local-strategy');
//ocalStrategy(passport);


//ADMIN PANEL ROUTES
app.use('/',  indexRouter);
app.use('/panel' , imageRouter);
app.use('/panel' , productsRoutes);
app.use('/panel' , categoriesRoutes);
//app.use('/panel' , localeRoutes);
//app.use('/panel' , newsRoutes);
//app.use('/panel' , promoRoutes);
//app.use('/panel' , productReviewsRoutes);
//app.use('/panel' , ordersRoutes);
//app.use('/panel' , coordRoutes);
//app.use('/panel' , aboutRoutes);

//app.use('/secret' , require('./routes/secret-routes'));

//API ROUTES
app.use('/api' , productsApiRoutes);
//app.use('/api' , promocodesApiRoutes);
app.use('/api' , categoriesApiRoutes);
//app.use('/api' , feedBackApiRoutes);
//app.use('/api' , ordersApiRoutes);
//app.use('/api' , mapApiRoutes);
//app.use('/api' , aboutApiRoutes);
//app.use('/api' , localeApiRoutes);
//app.use('/api' , newsApiRoutes);//добавлены новости

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//app.use('/', indexRouter);
app.use('/users', usersRouter);

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
