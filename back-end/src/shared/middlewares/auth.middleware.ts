import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../utils/http-exception';

const JWT_SECRET = process.env.JWT_SECRET || 'furniro_jwt_secret_key_2026';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new HttpException(401, 'Token de autenticação não fornecido.', null));
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(new HttpException(401, 'Formato de token inválido.', null));
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    req.user = decoded;
    return next();
  } catch {
    return next(new HttpException(401, 'Token inválido ou expirado.', null));
  }
};