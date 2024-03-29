require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const masterRouter = require("./routes/masterRoute");
const passport = require('passport');
var app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const dev_db_url = `mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.vndnniu.mongodb.net/${process.env.database}?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());
require('./config/passport');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", masterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = 8080
app.listen(port, () => {
  console.log(`app is listening at port ${port}`)
})

module.exports = app;
