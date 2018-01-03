import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import { generateToken } from '../seeds';

const { expect } = chai;
const request = supertest(app);
let userId;
let token;
let adminToken;

describe('Middlewares', () => { // Describe Middlewares
  before(() => {
    const {
      userToken,
      adminToken: aToken,
      userId: id
    } = generateToken();
    token = userToken;
    adminToken = aToken;
    userId = id;
  });
  describe('# Authenticate', () => {
    it(
      'should return Unauthorized status when invalid token is provided',
      (done) => {
        request
          .get('/api/v1/books')
          .set('authenticate-token', 'invalidToken')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0])
              .to.equal('Your session has expired.' +
              ' Please try logging in again');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should return an error when the user making ' +
      'the request is not the same as logged in user',
      (done) => {
        request
          .get('/api/v1/users/123456/books')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0])
              .to.equal('You are not allowed to perform that action');
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
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0])
              .to.equal('Your session has expired. ' +
              'Please try logging in again');
            if (err) return done(err);
            done();
          });
      }
    );
  });

  describe('# User Authenticate', () => {
    it(
      'should return OK status when a ' +
    'user has been authenticated successfully',
      (done) => {
        request
          .get(`/api/v1/users/${userId}/books?returned=false`)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Success');
            expect(res.body.books[0].id).to.equal(2);
            if (err) return done(err);
            done();
          });
      }
    );
  });

  describe('# Admin Authenticate', () => {
    it(
      'normal user should not be able to view admin protected route',
      (done) => {
        request
          .get('/api/v1/books/stocks')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0])
              .to.equal('You don\'t have the necessary ' +
              'right to access that page');
            if (err) return done(err);
            done();
          });
      }
    );

    it('admin user should be able to view admin page', (done) => {
      request
        .get('/api/v1/books/stocks')
        .set('authenticate-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('No stock record found');
          if (err) return done(err);
          done();
        });
    });
  });
});

