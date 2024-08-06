import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User.Model';
import HTTPStatus from '../utils/HTTPStatus';

const invalidMessage = 'Invalid email or password';

const validateEmailFormat = (email: string) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};
const validateFields = (email: string, password: string, res: Response) => {
  if (!email || !password) {
    res.status(HTTPStatus.badRequest).json({ message: 'All fields must be filled' });
    return false;
  }
  if (!validateEmailFormat(email)) {
    res.status(HTTPStatus.unauthorized).json({ message: invalidMessage });
    return false;
  }
  if (password.length < 6) {
    res.status(HTTPStatus.unauthorized).json({ message: invalidMessage });
    return false;
  }
  return true;
};
const findUserByEmail = async (email: string, res: Response) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(HTTPStatus.unauthorized).json({ message: invalidMessage });
    return null;
  }
  return user;
};
const validatePassword = (password: string, hashedPassword: string, res: Response) => {
  if (!bcrypt.compareSync(password, hashedPassword)) {
    res.status(HTTPStatus.unauthorized).json({ message: invalidMessage });
    return false;
  }
  return true;
};
const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!validateFields(email, password, res)) return;

  const user = await findUserByEmail(email, res);
  if (!user) return;

  if (!validatePassword(password, user.password, res)) return;

  next();
};

export default validateLogin;
