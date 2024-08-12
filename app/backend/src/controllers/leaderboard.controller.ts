import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  public static async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  }

  public static async getAwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getAwayLeaderboard();
    return res.status(200).json(leaderboard);
  }

  public static async getOverallLeaderboard(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await LeaderboardService.getOverallLeaderboard();
    return res.status(200).json(leaderboard);
  }
}
