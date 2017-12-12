import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';
import { generateToken } from '../../seeds';

const { expect } = chai;
const request = supertest(app);
let token;
let userId;
const bookId = 1;

describe('# User Book', () => {
  before(() => {
    const {
      userToken,
      userId: id
    } = generateToken();
    token = userToken;
    userId = id;
  });
  it(
    'should be able to get all the books in the Library',
    (done) => {
      request
        .get('/api/v1/books')
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    `should be able to get the book with ID ${bookId} in the Library`,
    (done) => {
      request
        .get(`/api/v1/books/${bookId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );
  it(
    'should be able to get books in ASC order',
    (done) => {
      request
        .get(`/api/v1/books/histories/${userId}?orderBy=ASC`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.pagination).to.have.property('page');
          if (err) return done(err);
          done();
        });
    }
  );
  it(
    'should be able to get books in DESC order',
    (done) => {
      request
        .get(`/api/v1/books/histories/${userId}?orderBy=DESC`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.pagination).to.have.property('page');
          if (err) return done(err);
          done();
        });
    }
  );
});
