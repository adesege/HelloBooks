import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';

const { expect } = chai;
const request = supertest(app);

describe('Client App', () => { // Describe Client App
  describe('# Entry point', () => { // Describe entry point
    it('should return 200 Ok when the client endpoint is accessed', (done) => {
      request
        .get('/test')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
  });
});
