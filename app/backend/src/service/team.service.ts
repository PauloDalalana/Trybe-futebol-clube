import Team from '../database/models/Team.Model';
import { IServiceResponse } from '../Interfaces/IServiceResponse';

export default class TeamService {
  static async getAll(): Promise<IServiceResponse<Team[]>> {
    const data = await Team.findAll();
    return { status: 'SUCCESS', data };
  }

  static async getById(id: number): Promise<IServiceResponse<Team | null>> {
    const data = await Team.findByPk(id);
    return { status: 'SUCCESS', data };
  }
}
