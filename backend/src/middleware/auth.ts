import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IUser;
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || '')) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };