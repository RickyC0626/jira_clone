import { RequestHandler } from 'express';

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next): Promise<any> => {
    try {
      return await Promise.resolve(requestHandler(req, res, next));
    } catch (error) {
      next(error);
    }
  };
};
