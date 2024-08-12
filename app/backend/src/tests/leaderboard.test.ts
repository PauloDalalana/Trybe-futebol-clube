import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches.Model';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Leaderboard API', () => {
  let chaiHttpResponse: Response;

  const matchesMock = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 2,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: { teamName: 'Team A' },
      awayTeam: { teamName: 'Team B' },
    },
    {
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 0,
      awayTeamId: 3,
      awayTeamGoals: 3,
      inProgress: false,
      homeTeam: { teamName: 'Team B' },
      awayTeam: { teamName: 'Team C' },
    },
  ];

  before(() => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as Matches[]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });

  describe('GET /leaderboard/home', () => {
    it('deve retornar a tabela de classificação de jogos como mandante', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('name');
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    });
  });

  describe('GET /leaderboard/away', () => {
    it('deve retornar a tabela de classificação de jogos como visitante', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('name');
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    });
  });

  describe('GET /leaderboard', () => {
    it('deve retornar a tabela de classificação geral', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.have.property('name');
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    });

    it('deve retornar a tabela de classificação geral ordenada de acordo com quem tem mais pontos para quem tem menos pontos', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      const expectedLeaderboard = [
        {
          name: 'Team C',
          totalPoints: 3,
          totalGames: 1,
          totalVictories: 1,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 3,
          goalsOwn: 0,
          goalsBalance: 3,
          efficiency: '100.00',
        },
        {
          name: 'Team A',
          totalPoints: 3,
          totalGames: 1,
          totalVictories: 1,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 2,
          goalsOwn: 1,
          goalsBalance: 1,
          efficiency: '100.00',
        },
        {
          name: 'Team B',
          totalPoints: 0,
          totalGames: 2,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 2,
          goalsFavor: 1,
          goalsOwn: 5,
          goalsBalance: -4,
          efficiency: '0.00',
        },
      ];

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body).to.deep.equal(expectedLeaderboard);
    });
  });
});