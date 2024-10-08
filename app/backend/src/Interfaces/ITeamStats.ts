export default interface ITeamStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export type LeaderboardProcessor = (
  leaderboard: Record<string, ITeamStats>,
  teamName: string,
  teamGoals: number,
  opponentGoals: number
) => void;
