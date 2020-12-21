const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const usersRouter = require('./routes/users');
const carritoRouter = require('./routes/carrito');
const loginRouter = require('./routes/login');
const productoRouter = require('./routes/product-detail');
const registerRouter = require('./routes/register');
const productCreateFormRouter = require('./routes/product-create-form');
const productEditFormRouter = require('./routes/product-edit-form'); 

const productsRouter = require('./routes/products');
const mainRouter = require('./routes/main');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
        secret:'digitalWine',
        resave: true,
        saveUninitialized: true
      }));

app.use(express.static(path.join(__dirname, '../public')));



app.use('/users', usersRouter);
app.use('/carrito', carritoRouter);
app.use('/login', loginRouter);
app.use('/product-detail', productoRouter);
app.use('/register', registerRouter);
app.use('/product-create-form', productCreateFormRouter);
app.use('/product-edit-form', productEditFormRouter);

app.use('/products', productsRouter);
app.use('/', mainRouter);

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
