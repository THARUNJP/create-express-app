import { HTTP_STATUS } from '../lib/constants.js';
import { env } from '../config/env.js';

export class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} [statusCode]
   * @param {boolean} [isOperational]
   */
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/** @type {import('express').RequestHandler} */
export const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, HTTP_STATUS.NOT_FOUND));
};

/** @type {import('express').ErrorRequestHandler} */
export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message =
    err instanceof AppError && err.isOperational ? err.message : 'Internal server error';

  if (env.isDev) {
    console.error('[Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.isDev && { stack: err.stack }),
  });
};
