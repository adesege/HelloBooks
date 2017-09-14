import chai from 'chai';
import request from 'supertest';
import faker from 'faker';
import app from '../../../express';

const expect = chai.expect;
const email = faker.internet.email();
const adminEmail = faker.internet.email();
const user = {
  name: 'Test Test',
  password: '1234',
  confirmPassword: '1234',
  email,
  group: 'user'
};
const admin = {
  name: 'Admin Test',
  password: '2345',
  confirmPassword: '2345',
  email: adminEmail,
  group: 'admin'
};
const book = {
  title: `Half of a yellow sun ${faker.random.number()}`,
  description: 'Half of a yellow sun is a book by Chimamanda Adichie',
  author: 'Chimamanda Adichie',
  published_date: '07-09-2017',
  isbn: faker.random.number().toString(),
  stock_quantity: 12,
  stock_record_date: '08-09-2017'
};
const stock = {
  quantity: 3,
  record_date: '07-09-2017'
};
const bookCategory = {
  name: faker.random.word()
};
let setUser = '';
let setAdmin = '';
let stockId = '';
let requestApp = request(app);

describe('API Tests', () => { // Describe the API test suite
  /**
   * @function Describe User signup and signin
   */
  describe('User signup and signin', () => { // Describe User signup and signin suite
    /**
     * @function Signup suite
     */
    describe('# Signup', () => {
      it('should create a user', (done) => {
        requestApp.post('/api/v1/users/signup').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should create an admin', (done) => {
        requestApp.post('/api/v1/users/signup').send(admin).end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user with same email address twice', (done) => {
        request(app).post('/api/v1/users/signup').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user if one or more field is empty', (done) => {
        request(app).post('/api/v1/users/signup').send({}).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });
    /**
     * @function Signin suite
     */
    describe('# Signin', () => {
      it('should log a user in', (done) => {
        requestApp = request(app);
        requestApp.post('/api/v1/users/signin').send(user).end((err, res) => {
          setUser = res.body;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should log an admin in', (done) => {
        requestApp = request(app);
        requestApp.post('/api/v1/users/signin').send(admin).end((err, res) => {
          setAdmin = res.body;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong email address', (done) => {
        user.email = 'wrong@email.com';
        request(app).post('/api/v1/users/signin').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong password', (done) => {
        user.password = '2345';
        user.email = email;
        request(app).post('/api/v1/users/signin').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });
  });


  /**
   * @function describe(name, callBack) Describe Books
   */
  describe('Books', () => {
    let bookId = '';
    let bookCategoryId = '';
    describe('# Books Category', () => {
      it('should be able to add a book category', (done) => {
        const token = setAdmin.token;
        requestApp
          .post('/api/v1/books/categories')
          .send(bookCategory)
          .set('authenticate-token', token)
          .end((err, res) => {
            bookCategoryId = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.message).to.equal('Category added successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should get all books categories', (done) => {
        const token = setAdmin.token;
        requestApp
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
        const token = setAdmin.token;
        bookCategory.name = 'A new category name';
        requestApp
          .put(`/api/v1/books/categories/${bookCategoryId}`)
          .send(bookCategory)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Category updated successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be delete a book category', (done) => {
        const token = setAdmin.token;
        requestApp
          .delete(`/api/v1/books/categories/${bookCategoryId}`)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Category deleted successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('# Admin', () => {
      it('should be able to add a book', (done) => {
        const token = setAdmin.token;
        book.book_category_id = bookCategoryId;
        requestApp
          .post('/api/v1/books')
          .send(book)
          .set('authenticate-token', token)
          .end((err, res) => {
            bookId = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.message).to.equal('Book added successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be able to edit a book', (done) => {
        const token = setAdmin.token;
        book.title = 'Purple Hibiscus';
        book.description = 'Purple Hibiscus was written by Chimamanda Adichie';
        requestApp
          .put(`/api/v1/books/${bookId}`)
          .send(book)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Book successfully updated');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });
      /**
      * @function Describe Stocks Manager Suite
      */
      describe('# Stocks', () => { // Describe Books Stocks
        it('should be able to add a stock', (done) => {
          const token = setAdmin.token;
          stock.book_id = bookId;
          requestApp
            .post('/api/v1/books/stocks')
            .send(stock)
            .set('authenticate-token', token)
            .end((err, res) => {
              stockId = res.body.id;
              expect(res.statusCode).to.equal(201);
              expect(res.body.message).to.equal('Stock added successfully');
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

        it('should be able to get all stocks', (done) => {
          const token = setAdmin.token;
          requestApp
            .get('/api/v1/books/stocks')
            .send()
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

        it(`should delete stock with id ${stockId}`, (done) => {
          const token = setAdmin.token;
          requestApp
            .delete(`/api/v1/books/stocks/${stockId}`)
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

    describe('# User', () => { // Describe Authenticate middleware
      let borrowedBookId = '';
      it('should be able to get all the books in the Library', (done) => {
        const token = setUser.token;
        requestApp
          .get('/api/v1/books')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be able to borrow a book', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        // book.book_id = bookId;
        requestApp
          .post(`/api/v1/users/${userId}/books?book_id=${bookId}`)
          .send({ return_date: '10-09-2017' })
          .set('authenticate-token', token)
          .end((err, res) => {
            borrowedBookId = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be able to get list of books they are yet to return', (done) => {
        const userId = setUser.userId;
        const token = setUser.token;
        requestApp
          .get(`/api/v1/users/${userId}/books?returned=false`)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be able to return a book', (done) => {
        const userId = setUser.userId;
        const token = setUser.token;
        requestApp
          .put(`/api/v1/users/${userId}/books/${borrowedBookId}?bookId=${bookId}`)
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

  describe('Middlewares', () => { // Describe Middlewares
    describe('# Authenticate', () => { // Describe Authenticate middleware
      it('should return Unauthorized status', (done) => {
        request(app)
          .get('/api/v1/books')
          .set('authenticate-token', 'invalidToken')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('# User Authenticate', () => { // Describe Authenticate middleware
      it('should return OK status', (done) => {
        const userId = setUser.userId;
        const token = setUser.token;
        requestApp
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
      it('normal user should not be able to view admin page', (done) => {
        const token = setUser.token;
        requestApp
          .get('/api/v1/books/stocks')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('admin user should be able to view admin page', (done) => {
        const token = setAdmin.token;
        requestApp
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

  describe('Client App', () => { // Describe Client App
    describe('# Entry point', () => { // Describe entry point
      it('should return 200 Ok', (done) => {
        request(app)
          .get('/test')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
