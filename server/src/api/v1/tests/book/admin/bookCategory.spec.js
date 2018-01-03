import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../../express';
import bookCategory from '../../seeds/category';
import { generateToken } from '../../seeds';

const { expect } = chai;
const request = supertest(app);
let token;
let bookCategoryId;
let newBookCategory;

describe('# Books Category', () => {
  before(() => {
    bookCategoryId = bookCategory.id;
    const { adminToken } = generateToken();
    token = adminToken;
  });

  it('should be able to add a book category', (done) => {
    request
      .post('/api/v1/books/categories')
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Category added successfully');
        expect(res.body.category.name).to.equal(bookCategory.name);
        expect(res.body.category.id).to.equal(bookCategory.id);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should be able to add a book category again', (done) => {
    newBookCategory = {
      ...bookCategory,
      name: 'Category 2',
      id: 2
    };
    request
      .post('/api/v1/books/categories')
      .send(newBookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Category added successfully');
        expect(res.body.category.name).to.equal(newBookCategory.name);
        expect(res.body.category.id).to.equal(newBookCategory.id);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not add a book category with empty name value', (done) => {
    request
      .post('/api/v1/books/categories')
      .send({ name: '' })
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message[0])
          .to.equal('Please enter a category name');
        if (err) return done(err);
        done();
      });
  });

  it(
    'should not add a book category with the same name multiple times',
    (done) => {
      request
        .post('/api/v1/books/categories')
        .send(bookCategory)
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0])
            .to.equal('A category with this name already exist');
          if (err) return done(err);
          done();
        });
    }
  );

  it(
    'should not be able to add a book category if the name is not specified',
    (done) => {
      request
        .post('/api/v1/books/categories')
        .send({})
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0])
            .to.equal('Please enter a category name');
          if (err) return done(err);
          done();
        });
    }
  );

  it('should get all books categories', (done) => {
    request
      .get('/api/v1/books/categories')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.categories[0].name).to.equal(bookCategory.name);
        expect(res.body.categories[0].id).to.equal(bookCategory.id);
        if (err) return done(err);
        done();
      });
  });

  it('should update a book category', (done) => {
    bookCategory.name = 'A new category name';
    request
      .put(`/api/v1/books/categories/${bookCategoryId}`)
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message[0]).to.equal('Category updated successfully');
        expect(res.body.category.name).to.equal(bookCategory.name);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not update a book category with a wrong id', (done) => {
    bookCategory.name = 'A new category name';
    request
      .put('/api/v1/books/categories/99999999')
      .send(bookCategory)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0])
          .to.equal('Sorry, we cannot update this ' +
        'category because we can\'t find it');
        if (err) return done(err);
        done();
      });
  });

  it(
    'should not update a book category when the category name is not specified',
    (done) => {
      request
        .put(`/api/v1/books/categories/${bookCategoryId}`)
        .send({ name: '' })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('array');
          expect(res.body.message[0]).to.equal('Please enter a category name');
          if (err) return done(err);
          done();
        });
    }
  );

  it('should delete a book category', (done) => {
    request
      .delete('/api/v1/books/categories/2')
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
    request
      .delete('/api/v1/books/categories/90909090')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0])
          .to.equal('We can\'t find this category for deletion');
        if (err) return done(err);
        done();
      });
  });
});
