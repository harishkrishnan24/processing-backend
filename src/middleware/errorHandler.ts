import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Default error
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = 'Internal Server Error';
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
