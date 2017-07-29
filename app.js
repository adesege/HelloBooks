var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var register = require('./routes/register');
var reset = require('./routes/reset-password');
var dashboard = require('./routes/dashboard/dashboard');
var borrow = require('./routes/book/borrow');
var me = require('./routes/me');
var history = require('./routes/book/history');
var addbooks = require('./routes/book/add');
var bookCategory = require('./routes/book/category');
var catAdd = require('./routes/book/cat-add');
var bookView = require('./routes/book/view');
var stockView = require('./routes/book/stock/view');
var stockShow = require('./routes/book/stock/show');
var settings = require('./routes/dashboard/settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/reset-password', reset);
app.use('/dashboard', dashboard);
app.use('/book/borrow/:bookSlug/', borrow);
app.use('/me/', me);
app.use('/history/', history);
app.use('/books/add', addbooks);
app.use('/books/category', bookCategory);
app.use('/books/category/add', catAdd);
app.use('/books/view', bookView);
app.use('/books/stock', stockView);
app.use(stockShow);
app.use(settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
