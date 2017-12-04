import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import bookCategory from '../seeds/category';

const { expect } = chai;
const request = supertest(app);

/**
   * @function describe(name, callBack) Describe Books
*/
describe('# Books Category', () => {
  it('should be able to add a book category', (done) => {
    const { token } = global.admin;
    request
      .post('/api/v1/books/categories')
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        global.bookCategoryId = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Category added successfully');
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not be add a book category with empty name value', (done) => {
    const { token } = global.admin;
    request
      .post('/api/v1/books/categories')
      .send({ name: '' })
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message[0]).to.equal('The category name field is required');
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to add a book category with the same name multiple times', (done) => {
    const { token } = global.admin;
    request
      .post('/api/v1/books/categories')
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to add a book category if the name is not specified', (done) => {
    const { token } = global.admin;
    request
      .post('/api/v1/books/categories')
      .send({})
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should get all books categories', (done) => {
    const { token } = global.admin;
    request
      .get('/api/v1/books/categories')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should update a book category', (done) => {
    const { token } = global.admin;
    bookCategory.name = 'A new category name';
    request
      .put(`/api/v1/books/categories/${global.bookCategoryId}`)
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message[0]).to.equal('Category updated successfully');
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not update a book category with a wrong id', (done) => {
    const { token } = global.admin;
    bookCategory.name = 'A new category name';
    request
      .put('/api/v1/books/categories/99999999')
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not update a book category when the category name is not specified', (done) => {
    const { token } = global.admin;
    request
      .put(`/api/v1/books/categories/${global.bookCategoryId}`)
      .send({ name: '' })
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('array');
        if (err) return done(err);
        done();
      });
  });

  it('should be delete a book category', (done) => {
    const { token } = global.admin;
    request
      .delete(`/api/v1/books/categories/${global.bookCategoryId}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message[0]).to.equal('Category deleted successfully');
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not delete a book category if it can\'t find it', (done) => {
    const { token } = global.admin;
    request
      .delete('/api/v1/books/categories/90909090')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Category not found');
        if (err) return done(err);
        done();
      });
  });
});
