import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';
import { generateToken } from '../../seeds';

const { expect } = chai;
const request = supertest(app);
let token;
let userId;
const bookId = 1;
const bookId3 = 3;

describe('# Borrowed Book', () => {
  let borrowedBookId = '';
  before(() => {
    const {
      userToken,
      userId: id
    } = generateToken();
    token = userToken;
    userId = id;
  });
  it(
    'should be able to borrow a book',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId })
        .set('authenticate-token', token)
        .end((err, res) => {
          borrowedBookId = res.body.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('You have successfully  borrowed this book');
          expect(res.body.id).to.be.a('number');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to borrow another book',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: bookId3 })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('You have successfully  borrowed this book');
          expect(res.body.id).to.be.a('number');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not borrow a book if book cannot be found',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: 23 })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Sorry, we can\'t find this book');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to borrow a book more than once',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: bookId3 })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('You have already borrowed this book. Please return it before you can borrow it again.');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to borrow a book if quantity === 0',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('There are no more copies left of this book to borrow');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to borrow a book if one or more fields does not exist',
    (done) => {
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: 'sjkchjvfjvgyeu' })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Book ID must be integer');
          expect(res.body).to.have.property('message');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to get list of books a user is yet to return',
    (done) => {
      request
        .get(`/api/v1/users/${userId}/books?returned=false`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Success');
          expect(res.body.data[0].bookId).to.equal(global.bookId);
          expect(res.body.data[0].isReturned).to.equal(false);
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should get all the list of a particular book a user is yet to returned',
    (done) => {
      request
        .get(`/api/v1/users/${userId}/books?bookId=${bookId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Success');
          expect(res.body.data[0].bookId).to.equal(global.bookId);
          expect(res.body.data[0].userId).to.equal(userId);
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to return a book',
    (done) => {
      request
        .put(`/api/v1/users/${userId}/books/${borrowedBookId}?bookId=${bookId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('You have successfully returned this book');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to return a book when one or more parameters cannot be found',
    (done) => {
      request
        .put(`/api/v1/users/${userId}/books/10000000?bookId=9000000`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('No record available');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to get borrowing histories',
    (done) => {
      request
        .get(`/api/v1/books/histories/${userId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].bookId).to.equal(global.bookId);
          expect(res.body.data[1].bookId).to.equal(global.bookId3);
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );
});
