import { NextFunction } from 'express-serve-static-core';

export type AsyncRequestHandler<Request, Response> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type SyncRequestHandler<Request, Response> = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function asyncRequestHandler<Request, Response>(
  handler: AsyncRequestHandler<Request, Response>
): SyncRequestHandler<Request, Response> {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}
