import { Router } from 'express';
import matchesRouter from './matches.route';
import teamRouter from './team.route';
import loginRouter from './login.route';
import leaderboardRouter from './leaderboard.route';

const routes = Router();

routes.use('/teams', teamRouter);
routes.use('/login', loginRouter);
routes.use('/matches', matchesRouter);
routes.use('/leaderboard', leaderboardRouter);

export default routes;
