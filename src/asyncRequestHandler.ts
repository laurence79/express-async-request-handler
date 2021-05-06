import { NextFunction } from 'express-serve-static-core';

export type AsyncRequestHandler<Request, Response> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown | void>;

export type SyncRequestHandler<Request, Response> = (
  req: Request,
  res: Response,
  next: NextFunction
) => unknown | void;

export function asyncRequestHandler<Request, Response>(
  handler: AsyncRequestHandler<Request, Response>
): SyncRequestHandler<Request, Response> {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
