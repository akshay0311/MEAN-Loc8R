var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bp = require("body-parser");
var hbs = require("express-handlebars");
var mongoose = require("mongoose")
require('./app_api/models/db');
// for app logic
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');


//for the app api
var indexApi = require('./app_api/routes/index');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
 
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_server/public')));

// for application route
app.use('/', indexRouter);

// for api route
app.use('/api', indexApi);


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
