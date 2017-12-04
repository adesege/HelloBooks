import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';

const { expect } = chai;
const request = supertest(app);

describe('Middlewares', () => { // Describe Middlewares
  describe('# Authenticate', () => { // Describe Authenticate middleware
    it('should return Unauthorized status when invalid token is provided', (done) => {
      request
        .get('/api/v1/books')
        .set('authenticate-token', 'invalidToken')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Failed to authenticate user.');
          if (err) return done(err);
          done();
        });
    });

    it(
      'should return an error when the user making the request is not the same as logged in user',
      (done) => {
        const { token } = global.user;
        request
          .get('/api/v1/users/123456/books')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Sorry, this is not you.');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should return an error when the user does not provide a token',
      (done) => {
        request
          .get('/api/v1/users/123456/books')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Failed to authenticate user.');
            if (err) return done(err);
            done();
          });
      }
    );
  });

  describe('# User Authenticate', () => { // Describe Authenticate middleware
    it('should return OK status when a user has been authenticated successfully', (done) => {
      const { userId, token } = global.user;
      request
        .get(`/api/v1/users/${userId}/books?returned=false`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('# Admin Authenticate', () => { // Describe Authenticate middleware
    it('normal user should not be able to view admin protected route', (done) => {
      const { token } = global.user;
      request
        .get('/api/v1/books/stocks')
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Well, you need to be an admin to go in here');
          if (err) return done(err);
          done();
        });
    });

    it('admin user should be able to view admin page', (done) => {
      const { token } = global.admin;
      request
        .get('/api/v1/books/stocks')
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
    });
  });
});

