import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../service/user.service';
import ICustomError from '../Interfaces/ICustomError';
import HTTPStatus from '../utils/HTTPStatus';

class UserController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await UserService.login(email, password);
      return res.status(HTTPStatus.ok).json({ token });
    } catch (error) {
      const customError = error as ICustomError;
      return res.status(customError.statusCode
      || HTTPStatus.internalServerError).json({ message: customError.message });
    }
  }

  public static async getRole(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      if (!token) {
        return res.status(HTTPStatus.unauthorized).json({ message: 'Token not found' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_admin') as { id: number };
      const role = await UserService.getUserRole(decoded.id);

      return res.status(HTTPStatus.ok).json({ role });
    } catch (error) {
      return res.status(HTTPStatus.unauthorized).json({ message: 'Token must be a valid token' });
    }
  }
}

export default UserController;
