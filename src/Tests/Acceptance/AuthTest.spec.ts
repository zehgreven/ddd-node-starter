import 'mocha';
import { environment, rollbackMigrations } from '../TestCase';

import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth', () => {
  before((done) => {
    rollbackMigrations(done);
  });

  describe('/POST /auth/sign-up', () => {
    it('should register new user', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-up')
        .type('form')
        .send({
          login: 'test@test.com',
          password: 'testpass',
        })
        .end((err, res) => {
          res.should.have.status(201);

          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('login').eql('test@test.com');
          res.body.should.have.property('isActive').eql(true);

          done();
        });
    });

    it('should return validation error while registration', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-up')
        .type('form')
        .send({
          login: 'test',
          password: 'testpass',
        })
        .end((err, res) => {
          res.should.have.status(422);

          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('Validation error.');
          res.body.should.have.property('error');

          done();
        });
    });
  });

  describe('/POST /auth/sign-in', () => {
    it('should login user and return jwt token', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: environment.login,
          password: environment.password,
        })
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.be.a('object');
          res.body.should.have.property('token');

          done();
        });
    });

    it('should return validation error while login', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: 'only@login.com',
        })
        .end((err, res) => {
          res.should.have.status(422);

          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('Validation error.');
          res.body.should.have.property('error');

          done();
        });
    });

    it('should return user not found while login', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: 'incorret@login.com',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(404);

          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('User with login incorret@login.com not found.');

          done();
        });
    });

    it('should return login or password incorrect while login', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: 'admin@admin.com',
          password: '123456',
        })
        .end((err, res) => {
          res.should.have.status(404);

          res.body.should.be.a('object');
          res.body.should.have.property('errorMessage').eql('The login or password is incorrect. Try again, please.');

          done();
        });
    });
  });
});
