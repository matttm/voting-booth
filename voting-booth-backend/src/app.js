
const path = require('path');
// TODO: use an env json here?
if (process.env.NODE_ENV) {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    require('dotenv').config({
        path: path.resolve(
            __dirname,
            `./environments/${process.env.NODE_ENV}.environment`
        )
    });
} else {
    console.log('No node environment specified.');
    console.log('Shutting down...');
    process.exit(0);
}

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const apiRouter = require('./routes/api');

const app = express();

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
