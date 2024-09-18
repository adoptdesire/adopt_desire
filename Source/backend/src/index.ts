import morgan from 'morgan';
import 'reflect-metadata';
import './config/env-config';
import PROCESS from './config/env-constant';
import './database/raw-connection';
import './database/connection';
import './database/models/news-letter';
import LOGGER from './logger/logger';
import { ERROR_CONVERTER, ERROR_HANDLER, LOG_ERRORS } from './middleware/error-handler';
import { ApiError } from './utils/api-error';
import express, { Request, Response, NextFunction } from 'express';
import { MESSAGES as messages } from './helpers/response-messages';
import test from './news-letter';
import bodyParser from 'body-parser';

const APPLICATION = express();

APPLICATION.use(morgan('tiny'));
APPLICATION.use(express.urlencoded({ extended: true }));
APPLICATION.use(bodyParser.json());
APPLICATION.use('/news-letter', test);

// send back a 404 error for any unknown api request
APPLICATION.use((_request: Request, _response: Response, next: NextFunction) => {
  next(new ApiError(404, messages.noFound));
});

// for logging the errors
APPLICATION.use(LOG_ERRORS);

// convert error to ApiError, if needed
APPLICATION.use(ERROR_CONVERTER);

// handle error
APPLICATION.use(ERROR_HANDLER);

APPLICATION.listen(PROCESS.env['PORT'], () => {
  LOGGER.info(`server listening on port ${PROCESS.env['PORT']}`);
});
