import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();

teamRouter.get('/', TeamController.getAll);
teamRouter.get('/:id', TeamController.getById);

export default teamRouter;
