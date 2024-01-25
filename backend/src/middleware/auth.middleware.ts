import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwt.service';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next);
};