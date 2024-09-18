import { ApiError } from '../utils/api-error';
import { MESSAGES as messages } from '../helpers/response-messages';
import * as Sequelize from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import LOGGER from '../logger/logger';
import { APIResponse } from '../helpers/api-response';

interface ICustomError extends Error {
  statusCode: number;
}

/**
 * Convert the error in readable format.
 * @param {ICustomError} error - Status code send to API Response.
 * @param {Request} _request - Getting the request from the client.
 * @param {Response} _response - Respond to the client with some result.
 * @param {NextFunction} next - the next() function is called after logging the current time, indicating that the app should move on to the next middleware function in the stack.
 */
export const ERROR_CONVERTER = (
  error: ICustomError,
  _request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  if (!(error instanceof ApiError)) {
    const STATUS_CODE = error.statusCode || error instanceof Sequelize.Error ? 400 : 500;
    const MESSAGE = messages.technicalError;
    error.stack = `${error.message} ${error.stack}`;
    error = new ApiError(STATUS_CODE, MESSAGE, error.stack);
  }
  next(error);
};

/**
 * Handle the global error from the environment.
 * @param {ICustomError} error - Status code send to API Response.
 * @param {Request} _request - Getting the request from the client.
 * @param {Response} _response - Respond to the client with some result.
 * @param {NextFunction} next - the next() function is called after logging the current time, indicating that the app should move on to the next middleware function in the stack.
 */
export const ERROR_HANDLER = (
  error: ICustomError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response<unknown, Record<string, unknown>> => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { statusCode, message } = error;
  response.locals['errorMessage'] = error.message;

  const ERROR_RESPONSE = new APIResponse(false, error.stack ? error.stack : '', statusCode, message).response;

  return response.status(statusCode).send(ERROR_RESPONSE);
};

/**
 * Logging the error which came from the global environment.
 * @param {ICustomError} error - Status code send to API Response.
 * @param {Request} _request - Getting the request from the client.
 * @param {Response} _response - Respond to the client with some result.
 * @param {NextFunction} next - the next() function is called after logging the current time, indicating that the app should move on to the next middleware function in the stack.
 */
export const LOG_ERRORS = (error: ICustomError, _request: Request, _response: Response, next: NextFunction): void => {
  LOGGER.error(error.stack);
  next(error);
};
