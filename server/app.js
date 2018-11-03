var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const morgan = require('morgan')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
var passport = require('./passport');
var index = require('./routes/index');
var api = require('./routes/api');
var user = require('./routes/user');

var app = express();


mongoose.connect("mongodb://127.0.0.1:27017/problem", err => {
  if(err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.set('view engine', 'jade')

app.use('/', index);
app.use('/api', api);

app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ url: "mongodb://127.0.0.1:27017/problem", autoReconnect: true }),
		resave: false, //required
		saveUninitialized: false //required
	})
)




// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


app.use('/user', user);






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
