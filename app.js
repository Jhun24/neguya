var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fb = require('facebook-chat-api');
var serveStatic = require("serve-static");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


var schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/nugu", function (err) {
    if(err){
      console.log("DB Err");
      throw err;
    }
});

//schema declare
var reportSchema = new schema({
    _id : String,
    sender : String,
    catcher : String,
    cause : String
});

var eventSchema = new schema({
    _id : String,
    date : String,
    startTime : String,
    finishTime : String,
    content : String
});

var Report = mongoose.model('reports', reportSchema);
var Event = mongoose.model('events', eventSchema);

// view engine setup
app.set('view engine', 'html')
app.set('views', 'views')
app.engine('html', require('ejs').renderFile);



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
require("./routes/reservation.js")(app, Report);
require("./routes/event.js")(app, Event);
require("./routes/messenger.js")(app, fb);
require("./routes/index.js")(app);

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
});

module.exports = app;
