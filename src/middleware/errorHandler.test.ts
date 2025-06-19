import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { errorHandler, AppError } from './errorHandler';

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {};
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
    mockNext = vi.fn();

    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should handle errors with statusCode', () => {
    const error: AppError = {
      name: 'TestError',
      message: 'Test error message',
      statusCode: 400,
    };

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'Test error message',
      },
    });
  });

  it('should handle errors without statusCode (default to 500)', () => {
    const error: AppError = {
      name: 'TestError',
      message: 'Test error message',
    };

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'Internal Server Error',
      },
    });
  });

  it('should include stack trace in development environment', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const error: AppError = {
      name: 'TestError',
      message: 'Test error message',
      statusCode: 400,
      stack: 'Error stack trace',
    };

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'Test error message',
        stack: 'Error stack trace',
      },
    });

    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });

  it('should not include stack trace in production environment', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const error: AppError = {
      name: 'TestError',
      message: 'Test error message',
      statusCode: 400,
      stack: 'Error stack trace',
    };

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'Test error message',
      },
    });

    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });

  it('should log the error', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const error: AppError = {
      name: 'TestError',
      message: 'Test error message',
      statusCode: 400,
    };

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
