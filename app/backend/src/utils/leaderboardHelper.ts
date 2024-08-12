import ITeamStats from '../Interfaces/ITeamStats';

const initializeTeamStats = (teamName: string): ITeamStats => ({
  name: teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0.00',
});

const calculateTotalPoints = (goalsFavor: number, goalsOwn: number): number => {
  if (goalsFavor > goalsOwn) return 3;
  if (goalsFavor === goalsOwn) return 1;
  return 0;
};

const calculateEfficiency = (totalPoints: number, totalGames: number): string => (
  ((totalPoints / (totalGames * 3)) * 100).toFixed(2)
);

const updateStats = (
  stats: ITeamStats,
  goalsFavor: number,
  goalsOwn: number,
  totalPoints: number,
): ITeamStats => ({
  ...stats,
  totalGames: stats.totalGames + 1,
  goalsFavor: stats.goalsFavor + goalsFavor,
  goalsOwn: stats.goalsOwn + goalsOwn,
  totalPoints: stats.totalPoints + totalPoints,
  totalVictories: stats.totalVictories + (totalPoints === 3 ? 1 : 0),
  totalDraws: stats.totalDraws + (totalPoints === 1 ? 1 : 0),
  totalLosses: stats.totalLosses + (totalPoints === 0 ? 1 : 0),
  goalsBalance: stats.goalsFavor + goalsFavor - (stats.goalsOwn + goalsOwn),
  efficiency: calculateEfficiency(stats.totalPoints + totalPoints, stats.totalGames + 1),
});

const updateTeamStats = (
  leaderboard: Record<string, ITeamStats>,
  teamName: string,
  goalsFavor: number,
  goalsOwn: number,
): Record<string, ITeamStats> => {
  const updatedLeaderboard = { ...leaderboard };

  const teamStats = updatedLeaderboard[teamName] ?? initializeTeamStats(teamName);

  const totalPoints = calculateTotalPoints(goalsFavor, goalsOwn);

  const updatedStats = updateStats(teamStats, goalsFavor, goalsOwn, totalPoints);

  updatedLeaderboard[teamName] = updatedStats;

  return updatedLeaderboard;
};

export default updateTeamStats;
