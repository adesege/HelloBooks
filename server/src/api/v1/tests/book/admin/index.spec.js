import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';
import book from '../../seeds/book';
import { generateToken } from '../../seeds';

const { expect } = chai;
const request = supertest(app);
let newBook;
let token;
const bookCategoryId = 1;

describe('# Admin Books', () => {
  before(() => {
    const { adminToken } = generateToken();
    token = adminToken;
  });
  it('should be able to add a book', (done) => {
    newBook = {
      ...book,
      bookCategoryId
    };
    request
      .post('/api/v1/books')
      .send(newBook)
      .set('authenticate-token', token)
      .end((err, res) => {
        global.bookId = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Book added successfully');
        expect(res.body.id).to.equal(newBook.id);
        expect(res.body.book.title).to.equal(newBook.title);
        expect(res.body.book.bookCategoryId).to.equal(newBook.bookCategoryId);
        if (err) return done(err);
        done();
      });
  });

  it('should be able to add a book again', (done) => {
    newBook = {
      ...book,
      title: 'Purple Hibscus',
      ISBN: '213454679809',
      stockQuantity: 2,
      bookCategoryId,
      id: 2
    };
    request
      .post('/api/v1/books')
      .send(newBook)
      .set('authenticate-token', token)
      .end((err, res) => {
        global.bookId2 = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Book added successfully');
        expect(res.body.id).to.equal(newBook.id);
        expect(res.body.book.title).to.equal(newBook.title);
        expect(res.body.book.bookCategoryId).to.equal(newBook.bookCategoryId);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });


  it('should be able to add a book again and again', (done) => {
    newBook = {
      ...book,
      title: 'Right way to learn Javascript',
      description: 'A new book by Adesege',
      author: 'Adesege',
      ISBN: '1345679870654',
      stockQuantity: 2,
      bookCategoryId,
      id: 3
    };
    request
      .post('/api/v1/books')
      .send(newBook)
      .set('authenticate-token', token)
      .end((err, res) => {
        global.bookId3 = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Book added successfully');
        expect(res.body.id).to.equal(newBook.id);
        expect(res.body.book.title).to.equal(newBook.title);
        expect(res.body.book.bookCategoryId).to.equal(newBook.bookCategoryId);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not add a book if the description is not specified', (done) => {
    newBook = {
      ...book,
      bookCategoryId,
      title: 'A new title is here again',
      description: ''
    };
    request
      .post('/api/v1/books')
      .send(newBook)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message[0])
          .to.equal('The description field is required');
        if (err) return done(err);
        done();
      });
  });

  it('should not add a book if the title already exist', (done) => {
    request
      .post('/api/v1/books')
      .send(book)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0])
          .to.equal('A book with the same title already exist');
        if (err) return done(err);
        done();
      });
  });

  it(
    'should not add a book if the stock quantity is not provided',
    (done) => {
      newBook = {
        ...book,
        stockQuantity: undefined
      };
      request
        .post('/api/v1/books')
        .send(newBook)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0])
            .to.equal('The stock quantity is required');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not add a book if the stock quantity is not an integer',
    (done) => {
      newBook = {
        ...book,
        stockQuantity: 'a string',
        title: 'Here is a new title'
      };
      request
        .post('/api/v1/books')
        .send(newBook)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Quantity must be integer');
          if (err) return done(err);
          done();
        });
    }
  );

  it('should delete a book', (done) => {
    request
      .delete(`/api/v1/books/${global.bookId2}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Book deleted successfully');
        if (err) return done(err);
        done();
      });
  });

  it('should not delete a book when the id cannot be found', (done) => {
    request
      .delete('/api/v1/books/12345')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Book not found');
        if (err) return done(err);
        done();
      });
  });

  it('should be able to edit a book', (done) => {
    newBook = {
      ...book,
      title: 'Tarasha',
      description: 'An assassin story by Oyin young'
    };
    request
      .put(`/api/v1/books/${global.bookId}`)
      .send(newBook)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message[0]).to.equal('Book successfully updated');
        expect(res.body.book.title).to.equal(newBook.title);
        expect(res.body.book.description).to.equal(newBook.description);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should be able to edit a book with selected fields', (done) => {
    const title = 'Purple Hibiscus is a new title';
    const description = 'Purple Hibiscus was written by Chimamanda Adichie';
    request
      .put(`/api/v1/books/${global.bookId}?fields[]=title&fields[]=description`)
      .send({ title, description })
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message[0]).to.equal('Book successfully updated');
        expect(res.body.book.description).to.equal(description);
        expect(res.body.book.title).to.equal(title);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it(
    'should not be able to edit a book when the id cannot be found',
    (done) => {
      request
        .put('/api/v1/books/909099880')
        .send(book)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Book not found');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to edit a book when the title field is not specified',
    (done) => {
      book.title = '';
      request
        .put(`/api/v1/books/${global.bookId}`)
        .send(book)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message[0]).to.equal('The title field is required');
          if (err) return done(err);
          done();
        });
    }
  );
});
