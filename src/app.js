const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const setLocals = require('./middlewares/setLocals');
const log = require('./middlewares/log');
const cors = require('cors');

// Rutas
const usersRouter = require('./routes/users');
const carritoRouter = require('./routes/carrito');
const loginRouter = require('./routes/login');
const productoRouter = require('./routes/product-detail');
const registerRouter = require('./routes/register');
const degustacionRouter = require('./routes/blog/degustacion');
const cepasRouter = require('./routes/blog/cepas');
const guardaRouter = require('./routes/blog/guarda');
const productEditFormRouter = require('./routes/product-edit-form'); 
const productsRouter = require('./routes/products');
const mainRouter = require('./routes/main');
const usersdbRouter = require('./routes/usersdb');
const apiRouter = require('./routes/api');

//

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

app.use(setLocals);
app.use(log);


app.use('/users', usersRouter);
app.use('/carrito', carritoRouter);
app.use('/login', loginRouter);
app.use('/product-detail', productoRouter);
app.use('/register', registerRouter);
app.use('/degustacion', degustacionRouter);
app.use('/cepas', cepasRouter);
app.use('/guarda', guardaRouter);
app.use('/product-edit-form', productEditFormRouter);
app.use('/usersdb', usersdbRouter);
app.use(cors());
app.use('/api', apiRouter);

app.use('/products', productsRouter);
app.use('/', mainRouter);

/* app.use('/productsdb', productsdbRouter.list)
app.use('/usersdb', usersdbRouter.list) */

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
