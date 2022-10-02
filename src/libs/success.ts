import { Request, Response, NextFunction } from 'express'

export const successWrapper = (handler:any) => async (req:Request, res:Response, next:NextFunction) => {
    try {
      const response = await handler(req, res, next);
      res.json(response);
      next();
    } catch (err) {
      next(err);
    }
  };

export default successWrapper;
  