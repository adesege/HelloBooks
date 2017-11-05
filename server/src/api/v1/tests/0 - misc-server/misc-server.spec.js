import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';

const { expect } = chai;
const request = supertest(app);

describe('# Server side', () => {
  it('should return 200 OK if /api endpoint is accessed', (done) => {
    request.get('/api')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Hello-Books api!');
        if (err) return done(err);
        done();
      });
  });

  it('should return 404 if an end point cannot be found', (done) => {
    request.get('/api/v1/login')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        if (err) return done(err);
        done();
      });
  });

  it('should return 404 if a version folder cannot be found', (done) => {
    request.get('/api/v2/login')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        if (err) return done(err);
        done();
      });
  });
});

