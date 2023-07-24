import { config } from '../../config';
import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

interface ErrorWithStack extends Error {
  output?: {
    statusCode?: number;
    payload?: any;
  };
  isBoom?: boolean;
}

function withErrorStack(error: any, stack?: string): any {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.log(process.env.NODE_ENV === 'production'); // false
  console.log(err);
  next(err);
}

function wrapErrors(err: ErrorWithStack, req: Request, res: Response, next: NextFunction): void {
  if (!err.isBoom) {
    next(boom.badImplementation(err.message));
  }
  next(err);
}

function errorHandler(err: ErrorWithStack, req: Request, res: Response, next: NextFunction): void {
  const {
    output: { statusCode, payload } = {}
  } = err;
  
  res.status(statusCode as number);
  res.json(withErrorStack(payload, err.stack));
}

export {
  logErrors,
  errorHandler,
  wrapErrors
};
