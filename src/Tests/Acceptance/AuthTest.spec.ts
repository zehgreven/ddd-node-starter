import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');
import { environment, rollbackMigrations } from '../TestCase';

const should = chai.should();

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
          res.body.should.have.property('isActive').eql(false);

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
          login: 'alex.clare@test.com',
          password: 'testpass',
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
        .post('/auth/sign-up')
        .type('form')
        .send({
          login: 'alex.clare@test.com',
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
});
