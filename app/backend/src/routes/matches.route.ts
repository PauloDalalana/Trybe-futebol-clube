import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import validadeToken from '../middlewares/valiidateToken';
import errorHandler from '../middlewares/errorMiddleware';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);
matchesRouter.patch('/:id/finish', validadeToken, MatchesController.finishMatch);
matchesRouter.patch('/:id', validadeToken, MatchesController.updateMatch);
matchesRouter.post('/', validadeToken, MatchesController.createMatch);

matchesRouter.use(errorHandler);

export default matchesRouter;
