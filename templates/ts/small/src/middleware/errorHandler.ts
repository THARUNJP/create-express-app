import { Request, Response, NextFunction } from "express";
import AppError from "../lib/errors/appError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  // Trusted operational errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Unknown JS errors
  else if (err instanceof Error) {
    message = err.message;
  }

  // Log full error (never expose stack in prod)
  console.error({
    statusCode,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
};