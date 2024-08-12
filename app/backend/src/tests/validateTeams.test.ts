import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import validateTeams from '../middlewares/validateMatchesCreation';
import Team from '../database/models/Team.Model';

chai.use(chaiHttp);

const { expect } = chai;

describe('validateTeams Middleware', () => {
  let findByPkStub: sinon.SinonStub;

  beforeEach(() => {
    findByPkStub = sinon.stub(Team, 'findByPk');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve gerar um erro se os times forem iguais', async () => {
    try {
      await validateTeams(1, 1);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal('It is not possible to create a match with two equal teams');
    }
  });

  it('deve gerar um erro se homeTeam não existir', async () => {
    findByPkStub.withArgs(1).resolves(null);

    try {
      await validateTeams(1, 2);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal('There is no team with such id!');
    }
  });

  it('deve gerar um erro se awayTeam não existir', async () => {
    findByPkStub.withArgs(1).resolves({ id: 1 });
    findByPkStub.withArgs(2).resolves(null);

    try {
      await validateTeams(1, 2);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.equal('There is no team with such id!');
    }
  });

  it('não deve gerar um erro se ambas as equipes existirem e forem diferentes', async () => {
    findByPkStub.withArgs(1).resolves({ id: 1 });
    findByPkStub.withArgs(2).resolves({ id: 2 });
    try {
      await validateTeams(1, 2);
    } catch (error) {
      expect.fail('Expected no error, but got one');
    }
  });
});