import 'mocha';
import { environment } from '../TestCase';

import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Home', () => {
  describe('/GET /', () => {
    it('should return message', (done) => {
      chai
        .request(environment.baseUrl + environment.apiVersion)
        .get('')
        .end((err, res) => {
          chai.assert.equal(res.status, 200);
          chai.assert.deepEqual(res.body, { message: 'Home page.' });
          done();
        });
    });
  });
});
