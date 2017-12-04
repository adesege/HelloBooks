import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';

const { expect } = chai;
const request = supertest(app);


describe('# Borrowed Book', () => {
  let borrowedBookId = '';
  it(
    'should be able to borrow a book',
    (done) => {
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: global.bookId })
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
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: global.bookId3 })
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
    'should not be able to borrow a book if bookId cannot be found',
    (done) => {
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId3: global.bookId3 })
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
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: global.bookId3 })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: global.bookId })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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
      const { token, userId } = global.user;
      request
        .post(`/api/v1/users/${userId}/books`)
        .send({ bookId: 'sjkchjvfjvgyeu' })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to get list of books they are yet to return',
    (done) => {
      const { token, userId } = global.user;
      request
        .get(`/api/v1/users/${userId}/books?returned=false`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Success');
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to get all the list of books that are yet to be returned',
    (done) => {
      const { token, userId } = global.user;
      request
        .get(`/api/v1/users/${userId}/books?bookId=${global.bookId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Success');
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should be able to return a book',
    (done) => {
      const { token, userId } = global.user;
      request
        .put(`/api/v1/users/${userId}/books/${borrowedBookId}?bookId=${global.bookId}`)
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
      const { token, userId } = global.user;
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
      const { userId, token } = global.user;
      request
        .get(`/api/v1/books/histories/${userId}`)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('id');
          if (err) return done(err);
          done();
        });
    }
  );
});
