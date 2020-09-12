
var path = require('path');
if (process.env.NODE_ENV) {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    require('dotenv').config(
        { path: path.resolve(__dirname, `../.${process.env.NODE_ENV}.env` )}
        );
} else {
    // TODO: check for all needed vars and exit if they're not there
}

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized user');
    }
});

module.exports = app;
