import { Request, Response } from 'express';
import TeamService from '../service/team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    const { data } = await TeamService.getAll();
    res.status(200).json(data);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { data } = await TeamService.getById(Number(id));
    res.status(200).json(data);
  }
}
