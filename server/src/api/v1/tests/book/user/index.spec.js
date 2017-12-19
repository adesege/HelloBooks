import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';
import { generateToken } from '../../seeds';

const { expect } = chai;
const request = supertest(app);
let token;
let userId;
const bookId = 1;

const books = {
  books: [
    {
      id: 2,
      bookId: 3,
      userId: 1,
      isReturned: false,
    },
    {
      id: 1,
      bookId: 1,
      userId: 1,
      isReturned: true,
    }
  ],
  pagination: {
    pageSize: 2,
    totalCount: 2,
    page: 1,
    pageCount: 1,
    limit: 12
  }
};

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
          expect(res.body.data[0].title).to.equal('Purple Hibiscus is a new title');
          expect(res.body.data[0].author).to.equal('Chimamanda Adichie');
          expect(res.body.data[0].userId).to.equal(2);
          expect(res.body.data[0].id).to.equal(1);
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
          expect(res.body.data[0].id).to.equal(1);
          expect(res.body.data[0].title).to.equal('Purple Hibiscus is a new title');
          expect(res.body.data[0].userId).to.equal(2);
          expect(res.body.data[0].author).to.equal('Chimamanda Adichie');
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
          expect(res.body.data[0].id).to.equal(books.books[0].id);
          expect(res.body.data[0].userId).to.equal(books.books[0].userId);
          expect(res.body.data[0].isReturned).to.equal(books.books[0].isReturned);
          expect(res.body.pagination.page).to.equal(books.pagination.page);
          expect(res.body.pagination.totalCount).to.equal(books.pagination.totalCount);
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
          expect(res.body.data[1].id).to.equal(books.books[0].id);
          expect(res.body.data[1].userId).to.equal(books.books[0].userId);
          expect(res.body.data[1].isReturned).to.equal(books.books[0].isReturned);
          if (err) return done(err);
          done();
        });
    }
  );
});
