import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: { id: number; role: string };
}

const validadeToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET
    || 'secret_admin') as { id: number; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validadeToken;
