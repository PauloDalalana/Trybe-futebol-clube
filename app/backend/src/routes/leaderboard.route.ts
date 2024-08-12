import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', LeaderboardController.getAwayLeaderboard);
leaderboardRouter.get('/', LeaderboardController.getOverallLeaderboard);

export default leaderboardRouter;
