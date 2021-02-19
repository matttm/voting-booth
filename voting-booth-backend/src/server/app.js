import path from 'path';
import {config as configureEnv} from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import apiRouter from './routes/api';
import {immediateShutdown} from "./utilities";

// TODO: use an env json here?
if (process.env.NODE_ENV) {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    const config = configureEnv({
        path: path.resolve(
            process.cwd(),
            `./configurations/${process.env.NODE_ENV}.config`
        )
    });
    if (config.error) {
        console.log('Error loading configuration file.');
        immediateShutdown(-1);
    }
} else {
    console.log('No node environment specified.');
    immediateShutdown(-1);
}
const secrets = configureEnv();
if (secrets.error) {
    console.log('Secrets env not found, so some features will be disabled.');
} else {
    console.log('Secrets env found and loaded to the environment.');
}

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
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        const url = `${req.headers.host}${req.url}`;
        const insecureUrl = `http://${url}`;
        const secureUrl = `https://${url}`;
        console.log(`Redirecting from ${insecureUrl} to ${secureUrl}`);
        res.redirect(secureUrl);
    }
});

export default app;
