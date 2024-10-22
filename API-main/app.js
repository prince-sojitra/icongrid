var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')

const session = require('express-session');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var categoryRouter = require('./routes/category');
var iconRouter = require('./routes/icon');
var pngIconRouter = require('./routes/pngIcon');
var editIconRouter = require('./routes/editIcon');
var animatedRouter = require('./routes/animated');
var interfaceRouter = require('./routes/interface');
var countRouter = require('./routes/count');
var saveRouter = require('./routes/save');
var tagRouter = require('./routes/tag');
var popularRouter = require('./routes/popular-Icon');
var popCategotyRouter = require('./routes/pop-category');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IconGrid')
.then(() => console.log('Connected!'))
.catch((error) => console.log(error.message))

var app = express();

app.use(cors())

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/icon', iconRouter);
app.use('/pngIcon', pngIconRouter);
app.use('/editIcon', editIconRouter);
app.use('/animated', animatedRouter);
app.use('/interface', interfaceRouter);
app.use('/count', countRouter);
app.use('/save', saveRouter);
app.use('/tag', tagRouter);
app.use('/popular', popularRouter);
app.use('/popCategory', popCategotyRouter);

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
