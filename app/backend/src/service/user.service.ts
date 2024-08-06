import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User.Model';
import ICustomError from '../Interfaces/ICustomError';
import HTTPStatus from '../utils/HTTPStatus';

class UserService {
  public static async login(email: string, password: string) {
    if (!email || !password) {
      const error = new Error('All fields must be filled') as ICustomError;
      error.statusCode = HTTPStatus.badRequest;
      throw error;
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      const error = new Error('Invalid email or password') as ICustomError;
      error.statusCode = HTTPStatus.unauthorized;
      throw error;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret');

    return token;
  }

  public static async getUserRole(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error('User not found') as ICustomError;
      error.statusCode = HTTPStatus.notFound;
      throw error;
    }
    return user.role;
  }
}

export default UserService;
