import 'mocha';
import { environment, rollbackMigrations } from '../TestCase';

import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('User', () => {
  before((done) => {
    rollbackMigrations(done);
  });

  describe('/Get /users', () => {
    it('try to get users without x-access-token', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('errorMessage').eql('not authorized');
          done();
        });
    });

    it('try to get users with wrong x-access-token', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .get('/users')
        .set('x-access-token', 'dawda2dasf12rsdf.dawda2dasf12rsdf.dawda2dasf12rsdf')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('errorMessage').eql('not authorized');
          done();
        });
    });

    it('should return all users', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: environment.login,
          password: environment.password,
        })
        .then((res) => {
          chai
            .request(environment.baseUrl + environment.apiVersion)
            .get('/users')
            .set('x-access-token', res.body.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.have.header('x-items-count', '1');
              done();
            });
        });
    });

    it('should return user by ID', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: environment.login,
          password: environment.password,
        })
        .then((res) => {
          chai
            .request(environment.baseUrl + environment.apiVersion)
            .get(`/users/${environment.users[0].id}`)
            .set('x-access-token', res.body.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('id');
              res.body.should.have.property('login').eql('admin@admin.com');
              res.body.should.have.property('isActive').eql(true);
              done();
            });
        });
    });

    it('try to get user with wrong ID', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .post('/auth/sign-in')
        .type('form')
        .send({
          login: environment.login,
          password: environment.password,
        })
        .then((res) => {
          const id = 'cd0dbb82-e2bb-4d56-8a86-ed60c3d97225';
          chai
            .request(environment.baseUrl + environment.apiVersion)
            .get(`/users/${id}`)
            .set('x-access-token', res.body.token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('errorMessage').eql(`User with ID #${id} not found.`);
              done();
            });
        });
    });
  });
});
