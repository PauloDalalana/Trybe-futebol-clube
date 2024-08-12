import Matches from '../database/models/Matches.Model';
import Team from '../database/models/Team.Model';
import ILeaderboard from '../Interfaces/ITeamStats';
import updateTeamStats from '../utils/leaderboardHelper';

export default class LeaderboardService {
  private static async getMatchesAndUpdateLeaderboard(
    matchProcessor: (match: Matches, leaderboard:
    Record<string, ILeaderboard>) => Record<string, ILeaderboard>,
  ): Promise<ILeaderboard[]> {
    const matches = await Matches.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    let leaderboard: Record<string, ILeaderboard> = {};

    matches.forEach((match) => {
      leaderboard = matchProcessor(match, leaderboard);
    });

    return Object.values(leaderboard).sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  }

  private static processHomeMatch(match: Matches, leaderboard:
  Record<string, ILeaderboard>): Record<string, ILeaderboard> {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam) {
      return updateTeamStats(leaderboard, homeTeam.teamName, homeTeamGoals, awayTeamGoals);
    }
    return leaderboard;
  }

  private static processAwayMatch(match: Matches, leaderboard:
  Record<string, ILeaderboard>): Record<string, ILeaderboard> {
    const { awayTeam, awayTeamGoals, homeTeamGoals } = match;
    if (awayTeam) {
      return updateTeamStats(leaderboard, awayTeam.teamName, awayTeamGoals, homeTeamGoals);
    }
    return leaderboard;
  }

  private static processOverallMatch(match: Matches, leaderboard:
  Record<string, ILeaderboard>): Record<string, ILeaderboard> {
    let updatedLeaderboard = this.processHomeMatch(match, leaderboard);
    updatedLeaderboard = this.processAwayMatch(match, updatedLeaderboard);
    return updatedLeaderboard;
  }

  public static getHomeLeaderboard(): Promise<ILeaderboard[]> {
    return this.getMatchesAndUpdateLeaderboard(this.processHomeMatch.bind(this));
  }

  public static getAwayLeaderboard(): Promise<ILeaderboard[]> {
    return this.getMatchesAndUpdateLeaderboard(this.processAwayMatch.bind(this));
  }

  public static getOverallLeaderboard(): Promise<ILeaderboard[]> {
    return this.getMatchesAndUpdateLeaderboard(this.processOverallMatch.bind(this));
  }
}
