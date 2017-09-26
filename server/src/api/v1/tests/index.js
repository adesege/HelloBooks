import chai from 'chai';
import request from 'supertest';
import faker from 'faker';
import app from '../../../express';
import Utils from '../utils';

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
  stock_quantity: 1,
  stock_record_date: '08-09-2017'
};

const book2 = {
  title: `Half of a yellow sun ${faker.random.number()}`,
  description: 'Half of a yellow sun is a book by Chimamanda Adichie',
  author: 'Chimamanda Adichie',
  published_date: '07-09-2017',
  isbn: faker.random.number().toString(),
  stock_quantity: 2,
  stock_record_date: '08-09-2017'
};

const book3 = {
  title: `Half of a yellow sun ${faker.random.number()}`,
  description: 'Half of a yellow sun is a book by Chimamanda Adichie',
  author: 'Chimamanda Adichie',
  published_date: '07-09-2017',
  isbn: faker.random.number().toString(),
  stock_quantity: 2,
  stock_record_date: '08-09-2017'
};

const stock = {
  quantity: 3,
  recordDate: '07-09-2017'
};
const bookCategory = {
  name: faker.random.word()
};
let setUser = '';
let setAdmin = '';
let stockId = '';
let bookId3 = '';
let requestApp = request(app);

describe('API Tests', () => { // Describe the API test suite
  describe('Index', () => { // Describe User signup and signin suite
    /**
     * @function Signup suite
     */
    describe('# Server side', () => {
      it('should return 404 if an end point cannot be found', (done) => {
        requestApp.get('/api/v1/login')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            if (err) return done(err);
            done();
          });
      });

      it('should return 404 if a version folder cannot be found', (done) => {
        requestApp.get('/api/v2/login')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            if (err) return done(err);
            done();
          });
      });
    });
  });

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

      it('should not create a user using the same email address more than once', (done) => {
        requestApp.post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a user if the password does not match', (done) => {
        user.confirmPassword = 'hdvkhjdfvd';
        requestApp.post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
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

      it('should require the email field', (done) => {
        user.password = '2345';
        user.email = '';
        request(app)
          .post('/api/v1/users/signin')
          .send(user).end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should require the password field', (done) => {
        user.password = '';
        user.email = 'dfjkjf@njsf.com';
        request(app)
          .post('/api/v1/users/signin')
          .send(user).end((err, res) => {
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
    let bookId2 = '';
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

      it('should not be able to add a book category with the same name multiple times', (done) => {
        const token = setAdmin.token;
        requestApp
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
        const token = setAdmin.token;
        requestApp
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

      it('should not update a book category with a wrong id', (done) => {
        const token = setAdmin.token;
        bookCategory.name = 'A new category name';
        requestApp
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

      it('should not delete a book category if it can\'t find it', (done) => {
        const token = setAdmin.token;
        requestApp
          .delete('/api/v1/books/categories/90909090')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
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

      it('should be able to add a book again', (done) => {
        const token = setAdmin.token;
        book.book_category_id = bookCategoryId;
        requestApp
          .post('/api/v1/books')
          .send(book2)
          .set('authenticate-token', token)
          .end((err, res) => {
            bookId2 = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.message).to.equal('Book added successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });


      it('should be able to add a book again and again', (done) => {
        const token = setAdmin.token;
        book.book_category_id = bookCategoryId;
        requestApp
          .post('/api/v1/books')
          .send(book3)
          .set('authenticate-token', token)
          .end((err, res) => {
            bookId3 = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.message).to.equal('Book added successfully');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not add a book if the description is not specified', (done) => {
        const token = setAdmin.token;
        book3.description = '';
        book3.title = `A new title is here again ${faker.random.number()}`;
        requestApp
          .post('/api/v1/books')
          .send(book3)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not add a book if the title already exist', (done) => {
        const token = setAdmin.token;
        requestApp
          .post('/api/v1/books')
          .send(book)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not add a book if the stock quantity is not provided', (done) => {
        const token = setAdmin.token;
        book3.stock_quantity = undefined;
        requestApp
          .post('/api/v1/books')
          .send(book3)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not add a book if the stock record date is not provided', (done) => {
        const token = setAdmin.token;
        book2.stock_record_date = undefined;
        requestApp
          .post('/api/v1/books')
          .send(book2)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not add a book if the stock quantity is not an integer',
        (done) => {
          const token = setAdmin.token;
          book.stock_quantity = 'fdjfbdhfdbgh';
          book.title = `A new title is here ${faker.random.number()}`;
          requestApp
            .post('/api/v1/books')
            .send(book)
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

      it('should be delete a book', (done) => {
        const token = setAdmin.token;
        requestApp
          .delete(`/api/v1/books/${bookId2}`)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not delete a book when the id cannot be found', (done) => {
        const token = setAdmin.token;
        requestApp
          .delete('/api/v1/books/12345')
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
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

      it('should not be able to edit a book when the id cannot be found', (done) => {
        const token = setAdmin.token;
        requestApp
          .put('/api/v1/books/909099880')
          .send(book)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not be able to edit a book when the title field is not specified', (done) => {
        const token = setAdmin.token;
        book.title = '';
        requestApp
          .put(`/api/v1/books/${bookId}`)
          .send(book)
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      describe('# Notifications', () => {
        it('should get all notification in the database', (done) => {
          const token = setAdmin.token;
          requestApp
            .get('/api/v1/notifications')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body.data).to.be.an('array');
              if (err) return done(err);
              done();
            });
        });
      });
      describe('# Search', () => {
        it('should return 404 when a book can\'t be found', (done) => {
          const token = setAdmin.token;
          requestApp
            .get('/api/v1/search?q=jkdfbvdhfb&type=books')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body.data).to.be.an('array');
              if (err) return done(err);
              done();
            });
        });

        it('should be able to search for a book', (done) => {
          const token = setAdmin.token;
          requestApp
            .get('/api/v1/search?q=half&type=books')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body.data).to.be.an('array');
              if (err) return done(err);
              done();
            });
        });

        it('should return 400 if no query type is specified', (done) => {
          const token = setAdmin.token;
          requestApp
            .get('/api/v1/search?q=half')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              if (err) return done(err);
              done();
            });
        });
      });


      /**
      * @function Describe Stocks Manager Suite
      */
      describe('# Stocks', () => { // Describe Books Stocks
        it('should be able to add a stock', (done) => {
          const token = setAdmin.token;
          stock.bookId = bookId;
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

        it('should not be able to add a stock if the stock quantity is not provided', (done) => {
          const token = setAdmin.token;
          stock.bookId = bookId;
          stock.quantity = '';
          requestApp
            .post('/api/v1/books/stocks')
            .send(stock)
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });


        it('should not be able to add a stock if the book id cannot be found', (done) => {
          const token = setAdmin.token;
          stock.bookId = 5432434;
          requestApp
            .post('/api/v1/books/stocks')
            .send(stock)
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(404);
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

        it('should not be able to delete a stock with a wrong id', (done) => {
          const token = setAdmin.token;
          requestApp
            .delete('/api/v1/books/stocks/9878')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
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
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId })
          .set('authenticate-token', token)
          .end((err, res) => {
            borrowedBookId = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should be able to borrow another book', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        // book.book_id = bookId;
        requestApp
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId: bookId3 })
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not be able to borrow a book if bookId cannot be found', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        requestApp
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId3 })
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not be able to borrow a book more than once', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        // book.book_id = bookId;
        requestApp
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId: bookId3 })
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not be able to borrow a book if quantity === 0', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        // book.book_id = bookId;
        requestApp
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId })
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
      });

      it('should not be able to borrow a book if one or more fields does not exist', (done) => {
        const token = setUser.token;
        const userId = setUser.userId;
        // book.book_id = bookId;
        requestApp
          .post(`/api/v1/users/${userId}/books`)
          .send({ bookId: 'sjkchjvfjvgyeu' })
          .set('authenticate-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
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

      it('should not be able to return a book when one or more parameters cannot be found',
        (done) => {
          const userId = setUser.userId;
          const token = setUser.token;
          requestApp
            .put(`/api/v1/users/${userId}/books/10000000?bookId=9000000`)
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(404);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

      it('should be able to get borrowing histories',
        (done) => {
          const userId = setUser.userId;
          const token = setUser.token;
          requestApp
            .get(`/api/v1/books/histories/${userId}`)
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

      describe('# Profile', () => { // Describe Profile
        it('should not be able to change their password if the new password do not match the old one',
          (done) => {
            const userId = setUser.userId;
            const token = setUser.token;
            request(app)
              .put(`/api/v1/users/${userId}`)
              .send({
                password: 'newPassword',
                passwordConfirm: 'newPassword',
                oldPassword: '123454'
              })
              .set('authenticate-token', token)
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.be.an('object');
                if (err) return done(err);
                done();
              });
          });

        it('should be able to change their password', (done) => {
          const userId = setUser.userId;
          const token = setUser.token;
          request(app)
            .put(`/api/v1/users/${userId}`)
            .send({
              password: 'newPassword',
              passwordConfirm: 'newPassword',
              oldPassword: '1234'
            })
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

        it('should not be able to change their password if the passwords do not match', (done) => {
          const userId = setUser.userId;
          const token = setUser.token;
          request(app)
            .put(`/api/v1/users/${userId}`)
            .send({
              password: 'newPassword',
              passwordConfirm: 'newPassword23',
              oldPassword: '1234'
            })
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

        it('should be able to get a particular user', (done) => {
          const userId = setUser.userId;
          const token = setUser.token;
          request(app)
            .get(`/api/v1/users/${userId}`)
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

      it('should return an error when the user making the request is not the same as logged in user',
        (done) => {
          const token = setUser.token;
          request(app)
            .get('/api/v1/users/123456/books')
            .set('authenticate-token', token)
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body).to.be.an('object');
              if (err) return done(err);
              done();
            });
        });

      it('should return an error when the user does not provide a token',
        (done) => {
          request(app)
            .get('/api/v1/users/123456/books')
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

  describe('Utils', () => { // Describe Client App
    describe('# Random string', () => { // Describe entry point
      it('should return a random string', (done) => {
        expect(Utils.randomString(3)).to.be.a('string');
        done();
      });
    });

    describe('# Return Dste', () => { // Describe entry point
      it('should return all return date', (done) => {
        expect(Utils.returnDate()).to.be.an('object');
        done();
      });

      it('should return a user rank return date', (done) => {
        expect(Utils.returnDate('beginner')).to.be.a('number');
        done();
      });
    });
  });
});
