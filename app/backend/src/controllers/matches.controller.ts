import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';
import HTTPStatus from '../utils/HTTPStatus';

const matchEqualTeamsError = 'It is not possible to create a match with two equal teams';
const teamNotFoundError = 'There is no team with such id!';

const handleCreateMatchError = (error: Error): number => {
  const errorMapping: { [key: string]: number } = {
    [matchEqualTeamsError]: HTTPStatus.unprocessableEntity,
    [teamNotFoundError]: HTTPStatus.notFound,
  };
  return errorMapping[error.message] || HTTPStatus.internalServerError;
};

export default class MatchesController {
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { inProgress } = req.query;
      let progress: boolean | undefined;

      if (inProgress === 'true') {
        progress = true;
      } else if (inProgress === 'false') {
        progress = false;
      } else if (inProgress !== undefined) {
        return res.status(HTTPStatus.badRequest)
          .json({ message: 'Invalid parameter value for inProgress' });
      }

      const matches = await MatchesService.getAll(progress);
      return res.status(HTTPStatus.ok).json(matches);
    } catch (error) {
      return res.status(HTTPStatus.internalServerError)
        .json({ message: HTTPStatus.internalServerError });
    }
  }

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await MatchesService.finishMatch(Number(id));
      return res.status(HTTPStatus.ok).json({ message: 'Finished' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Match not found') {
        return res.status(HTTPStatus.notFound).json({ message: error.message });
      }
      return res.status(HTTPStatus.internalServerError)
        .json({ message: HTTPStatus.internalServerError });
    }
  }

  static async updateMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(HTTPStatus.ok).json({ message: 'Match updated' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Match not found') {
        return res.status(HTTPStatus.notFound).json({ message: error.message });
      }
      return res.status(HTTPStatus.internalServerError)
        .json({ message: HTTPStatus.internalServerError });
    }
  }

  static async createMatch(req: Request, res: Response): Promise<Response> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await MatchesService.createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(HTTPStatus.created).json(match);
    } catch (error) {
      if (error instanceof Error) {
        const statusCode = handleCreateMatchError(error);
        return res.status(statusCode).json({ message: error.message });
      }
      return res.status(HTTPStatus.internalServerError)
        .json({ message: HTTPStatus.internalServerError });
    }
  }
}
