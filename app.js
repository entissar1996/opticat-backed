const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const multer  = require('multer')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter =require('./routes/products');
const commandRouter =require('./routes/command');
const panierRouter =require('./routes/panier');
const marqueRouter =require('./routes/marque');
const orderRouter =require('./routes/order');


const categoryRouter =require('./routes/category');
const pictureRouter =require('./routes/picture');
const avatarRouter =require('./routes/uploadsavatar');
const picturemarqueRouter =require('./routes/picturemarque');

const upload = multer({ dest: 'uploads/' })



// setting up express app
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// api endpoint
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/command', commandRouter); 
app.use('/marque', marqueRouter); 
app.use('/category', categoryRouter);
app.use('/panier', panierRouter);
app.use('/order', orderRouter);



app.use('/uploads', pictureRouter);
app.use('/uploadsavatar', avatarRouter);
app.use('/uploadsmarque', picturemarqueRouter);

app.use('/uploadsmarque', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploadsavatar', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));


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
  res.json({message:'500 Server error :('});
});

module.exports = app;
