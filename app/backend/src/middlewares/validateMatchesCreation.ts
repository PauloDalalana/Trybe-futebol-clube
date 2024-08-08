import Team from '../database/models/Team.Model';

const validateTeams = async (homeTeamId: number, awayTeamId: number): Promise<void> => {
  if (homeTeamId === awayTeamId) {
    throw new Error('It is not possible to create a match with two equal teams');
  }

  const homeTeam = await Team.findByPk(homeTeamId);
  const awayTeam = await Team.findByPk(awayTeamId);

  if (!homeTeam) {
    throw new Error('There is no team with such id!');
  }

  if (!awayTeam) {
    throw new Error('There is no team with such id!');
  }
};

export default validateTeams;
