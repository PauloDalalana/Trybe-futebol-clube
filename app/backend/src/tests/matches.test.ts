import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Matches.Model';
import { Response } from 'superagent';
import { FindOptions } from 'sequelize';
import MatchesService from '../service/matches.service';
chai.use(chaiHttp);


const { expect } = chai;

describe('GET /matches', () => {
  let chaiHttpResponse: Response;

  const matchesMock = [
    {
      id: 1,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 2,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: { teamName: 'Team A' },
      teamAway: { teamName: 'Team B' },
    },
    {
      id: 2,
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: true,
      teamHome: { teamName: 'Team C' },
      teamAway: { teamName: 'Team D' },
    },
  ];

  before(async () => {
    sinon.stub(Matches, 'findAll').callsFake(async (options?: FindOptions) => {
      if (options?.where && 'inProgress' in options.where) {
        const inProgress = (options.where as { inProgress: boolean }).inProgress;
        return matchesMock.filter(match => match.inProgress === inProgress) as unknown as Matches[];
      }
      return matchesMock as unknown as Matches[];
    });
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar uma lista de partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
  });

  it('deve ser possível filtrar as partidas em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.length(1);
    expect(chaiHttpResponse.body[0].inProgress).to.be.true;
  });

  it('deve ser possível filtrar as partidas finalizadas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.length(1);
    expect(chaiHttpResponse.body[0].inProgress).to.be.false;
  });

  it('deve retornar erro ao tentar acessar endpoint com parâmetros inválidos', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=invalid');

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Invalid parameter value for inProgress');
  });
  
  describe('PATCH /matches/:id/finish', () => {
    it('deve retornar erro ao tentar finalizar uma partida com ID inválido', async () => {
      const res = await chai.request(app).patch('/matches/invalid/finish');
  
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Token not found');
    });
    it('deve finalizar uma partida com sucesso', async () => {
      const matchStub = sinon.stub(Matches, 'findByPk').resolves({ save: sinon.stub(), inProgress: true } as unknown as Matches);
      await MatchesService.finishMatch(1);
      expect(matchStub.calledOnce).to.be.true;
      (Matches.findByPk as sinon.SinonStub).restore();
    });

    it('deve lançar erro quando a partida não for encontrada', async () => {
      sinon.stub(Matches, 'findByPk').resolves(null);
      try {
        await MatchesService.finishMatch(1);
      } catch (error) {
        expect(error).to.be.an('error').with.property('message', 'Match not found');
      }
      (Matches.findByPk as sinon.SinonStub).restore();
    });
  });

  describe('PATCH /matches/:id/update', () => {
    it('deve retornar erro ao tentar atualizar uma partida com ID inválido', async () => {
      const res = await chai.request(app).patch('/matches/invalid/update');
  
      expect(res).to.have.status(404);
    });
    it('deve atualizar uma partida com sucesso', async () => {
      const matchStub = sinon.stub(Matches, 'findByPk').resolves({ save: sinon.stub() } as unknown as Matches);
      await MatchesService.updateMatch(1, 1, 1);
      expect(matchStub.calledOnce).to.be.true;
      (Matches.findByPk as sinon.SinonStub).restore();
    });

    it('deve lançar erro quando a partida não for encontrada', async () => {
      sinon.stub(Matches, 'findByPk').resolves(null);
      try {
        await MatchesService.updateMatch(1, 1, 1);
      } catch (error) {
        expect(error).to.be.an('error').with.property('message', 'Match not found');
      }
      (Matches.findByPk as sinon.SinonStub).restore();
    });
  });

  describe('POST /matches', () => {
    it('deve criar uma partida com sucesso', async () => {
      const matchStub = sinon.stub(Matches, 'create').resolves({ save: sinon.stub() } as unknown as Matches);
      await MatchesService.createMatch(1, 2, 1, 1);
      expect(matchStub.calledOnce).to.be.true;
      (Matches.create as sinon.SinonStub).restore();
    });
  });
});