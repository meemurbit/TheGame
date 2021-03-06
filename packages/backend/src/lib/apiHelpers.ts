import { Request, Response, NextFunction } from 'express';

export function asyncHandlerWrapper(middleware: any) {
  if (middleware.length === 4) {
    return function wrappedHandler(error: Error, req: Request, res: Response, next: NextFunction) {
      middleware(error, req, res, next).catch(next);
    };
  }
  return function wrappedHandler(req: Request, res: Response, next: NextFunction) {
    middleware(req, res, next).catch(next);
  };
}

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);
  res.status(500).send('Unexpected error');
}
