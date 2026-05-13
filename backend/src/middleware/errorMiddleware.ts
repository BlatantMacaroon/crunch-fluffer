import { ApiError } from '@shared/types/apiError.ts';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // 1. Log the error for the developer (you)
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // 2. Identify the type of error
  const statusCode = err.name === 'ValidationError' ? 400 : 500;
  const errorResponse: ApiError = {
    message: err.message || "An unexpected error occurred"
  };

  // 3. Send the consistent response
  res.status(statusCode).json(errorResponse);
};