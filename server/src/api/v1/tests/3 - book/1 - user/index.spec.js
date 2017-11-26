import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';

const { expect } = chai;
const request = supertest(app);


describe('# User Book', () => {
  it(
    'should be able to get all the books in the Library',
    (done) => {
      const { token } = global.user;
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
    `should be able to get the book with ID ${global.bookId} in the Library`,
    (done) => {
      const { token } = global.user;
      request
        .get(`/api/v1/books/${global.bookId}`)
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
      const { token } = global.user;
      request
        .get(`/api/v1/books/histories/${global.user.userId}?orderBy=ASC`)
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
      const { token } = global.user;
      request
        .get(`/api/v1/books/histories/${global.user.userId}?orderBy=DESC`)
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
