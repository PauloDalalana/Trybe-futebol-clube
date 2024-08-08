import { Request, Response, NextFunction } from 'express';
import HTTPStatus from '../utils/HTTPStatus';

const MATCH_NOT_FOUND = 'Match not found';
const TEAM_NOT_FOUND = 'There is no team with such id!';
const MATCH_EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';

const errorMapping: { [key: string]: number } = {
  [MATCH_NOT_FOUND]: HTTPStatus.notFound,
  [TEAM_NOT_FOUND]: HTTPStatus.notFound,
  [MATCH_EQUAL_TEAMS]: HTTPStatus.unprocessableEntity,
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = errorMapping[error.message] || HTTPStatus.internalServerError;
  res.status(statusCode).json({ message: error.message || HTTPStatus.internalServerError });
};

export default errorHandler;
