import Matches from '../database/models/Matches.Model';
import validateTeams from '../middlewares/validateMatchesCreation';
import Team from '../database/models/Team.Model';

export default class MatchesService {
  static async getAll(inProgress?: boolean): Promise<Matches[]> {
    const where = inProgress !== undefined ? { inProgress } : undefined;
    return Matches.findAll({
      where,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  static async finishMatch(id: number): Promise<void> {
    const match = await Matches.findByPk(id);
    if (!match) throw new Error('Match not found');
    match.inProgress = false;
    await match.save();
  }

  static async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    const match = await Matches.findByPk(id);
    if (!match) throw new Error('Match not found');
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
  }

  static async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matches> {
    await validateTeams(homeTeamId, awayTeamId);

    const match = await Matches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return match;
  }
}
