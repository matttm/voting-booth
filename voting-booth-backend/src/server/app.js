import path from 'path';
import {config as configureEnv} from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import apiRouter from './routes/api';

// TODO: use an env json here?
if (process.env.NODE_ENV) {
    console.log(`Running in ${process.env.NODE_ENV} mode`);
    configureEnv({
        path: path.resolve(
            process.cwd(),
            `./src/environments/${process.env.NODE_ENV}.environment`
        )
    });
} else {
    console.log('No node environment specified.');
    console.log('Shutting down...');
    process.exit(0);
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

export default app;
