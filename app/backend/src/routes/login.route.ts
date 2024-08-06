import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validadeToken from '../middlewares/valiidateToken';
import validateLogin from '../middlewares/validateLogin';

const loginRouter = Router();

loginRouter.post('/', validateLogin, UserController.login);
loginRouter.get('/role', validadeToken, UserController.getRole);

export default loginRouter;
