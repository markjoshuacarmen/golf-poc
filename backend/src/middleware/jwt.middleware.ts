import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'jwtsecret';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized - No token provided' });
  }

  const trimmedToken = token.replace('Bearer ', '').trim();

  jwt.verify(trimmedToken, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    (req as any).user = decoded;

    next();
  });
};
