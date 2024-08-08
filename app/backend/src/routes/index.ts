import { Router } from 'express';
import matchesRouter from './matches.route';
import teamRouter from './team.route';
import loginRouter from './login.route';

const routes = Router();

routes.use('/teams', teamRouter);
routes.use('/login', loginRouter);
routes.use('/matches', matchesRouter);

export default routes;
