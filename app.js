var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var hbs = require('hbs');
var { engine } = require('express-handlebars')
var bodyParser = require('body-parser');

//web
var authRouter = require('./routes/web/auth');
var indexRouter = require('./routes/web/index');

var app = express();


// var branchesRouter = require('./routes/web/branches');
// var ordersRouter = require('./routes/web/orders');
// var servicesRouter = require('./routes/web/services');
// var staffsRouter = require('./routes/web/staffs');
// var vehiclePartsRouter = require('./routes/web/vehicle-parts');
// var vehicleRouter = require('./routes/web/vehicles');
var brandRouter = require('./routes/web/brand.router');
var categoryRouter = require('./routes/web/category.router');
var productRouter = require('./routes/web/product.router');
var chatRouter = require('./routes/chat');
//api
var product = require('./routes/apis/products');
var brandAPIRouter=require('./routes/apis/brand'); 
var productCategoryRouter = require('./routes/apis/product_category');
var userRouter = require('./routes/apis/users');
var cartRouter=require("./routes/apis/carts");
var cartDetailRouter=require("./routes/apis/cart_details")
var uploadRouter = require("./routes/apis/upload");


// Socket
// var app = express();


// view engine setup
app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

hbs.registerPartials(__dirname + "./views/partials");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//web
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/brand', brandRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/chat', chatRouter);


//api
app.use('/api/product', product);
app.use('/api/brand',brandAPIRouter);
app.use('/users', userRouter);
app.use('/api/category', productCategoryRouter);
app.use('/cart',cartRouter);
app.use('/cart-detail',cartDetailRouter);
app.use('/uploads', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {

  res.render('404',{layout:'other'});
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  // render the error page
  if (err.status === 500) {


    res.render('500',{layout:'other'});
  }
  if (err.status === 401) {

    res.render('404',{layout:'other'});
  }
});
module.exports = app;
