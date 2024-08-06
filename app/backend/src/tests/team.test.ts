import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team.Model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Routes', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Team, 'findAll').resolves([
      {
        id: 1,
        teamName: 'Grêmio',
      },
      {
        id: 2,
        teamName: 'Bahia',
      },
    ] as Team[]);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal([
        { id: 1, teamName: 'Grêmio' },
        { id: 2, teamName: 'Bahia' },
      ],
    );
  });

  it('deve retornar um time específico pesquisado pelo id', async () => {
    sinon.stub(Team, 'findByPk').resolves({
      id: 1,
      teamName: 'Avaí/Kindermann',
    } as Team);

    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({
      id: 1,
      teamName: 'Avaí/Kindermann',
    });

    (Team.findByPk as sinon.SinonStub).restore();
  });
});