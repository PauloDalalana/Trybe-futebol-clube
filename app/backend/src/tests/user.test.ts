import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.Model';
import * as jwt from 'jsonwebtoken';
import userMock from './mocks/userMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('UserController', () => {
  describe('POST /login', () => {
    const loginData = {
      email: 'user@gmail.com',
      password: '123456',
    };
  
    beforeEach(() => { sinon.restore(); });
  
    it('deve retornar um código de status 200 e um token', async () => {
      sinon.stub(User, 'findOne').resolves(User.build(userMock));
  
      sinon.stub(bcrypt, 'compareSync').returns(true);
  
      const response = await chai.request(app).post('/login').send(loginData);
  
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
    });
  
    it('deve retornar um código de status 401 quando a senha estiver incorreta', async () => {
      sinon.stub(User, 'findOne').resolves(User.build(userMock));
  
      sinon.stub(bcrypt, 'compareSync').returns(false);
  
      const response = await chai.request(app).post('/login').send(loginData);
  
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid email or password');
    });
  
    it('deve retornar um código de status 401 quando o usuário não for encontrado', async () => {
      sinon.stub(User, 'findOne').resolves(null);
  
      const response = await chai.request(app).post('/login').send(loginData);
  
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid email or password');
    });
  
    it('deve retornar um código de status 401 quando o e-mail não for válido', async () => {
      sinon.stub(User, 'findOne').resolves(null);
  
      const response = await chai.request(app).post('/login')
        .send({ ...loginData, email: 'invalidemail' });
  
      expect(response).to.have.status(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid email or password');
    });
  
    it('deve retornar um código de status 400 quando o e-mail não for fornecido', async () => {
      const response = await chai.request(app).post('/login').send({ password: loginData.password });
  
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  
    it('deve retornar um código de status 400 quando a senha não for fornecida', async () => {
      const response = await chai.request(app).post('/login').send({ email: loginData.email });
  
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });

  describe('GET /role', () => {
   const reqHeader = {
    authorization: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
   };
   beforeEach(() => { sinon.restore(); });
    it('deve retornar  401 quando o token for inválido', async () => {
      sinon.stub(jwt, 'verify').throws();

      const response = await chai.request(app).get('/login/role').set(reqHeader);

      expect(response).to.have.status(401);
    });

    it('deve retornar status 200 e verificar o role do usuário', async () => {
      sinon.stub(User, 'findByPk').resolves(User.build(userMock));
      sinon.stub(jwt, 'verify').resolves({ id: userMock.id, username: userMock.username, role: userMock.role });

      const response = await chai.request(app).get('/login/role').set(reqHeader);
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('role');
    });
  });
});