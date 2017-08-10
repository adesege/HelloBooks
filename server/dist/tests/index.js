'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var email = _faker2.default.internet.email();
var adminEmail = _faker2.default.internet.email();
var user = {
  name: 'Test Test',
  password: '1234',
  email: email,
  group: 'user'
};
var admin = {
  name: 'Admin Test',
  password: '2345',
  email: adminEmail,
  group: 'admin'
};
var book = {
  title: 'Half of a yellow sun',
  description: 'Half of a yellow sun is a book by Chimamanda Adichie',
  author: 'Chimamanda Adichie',
  published_date: '07-09-2017',
  isbn: '1234-432-543',
  stock: {
    quantity: 12,
    recordDate: '08-09-2017'
  }
};
var stock = {
  quantity: 3,
  record_date: '07-09-2017'
};
var setUser = '';
var setAdmin = '';
var stockId = '';
var requestApp = (0, _supertest2.default)(_app2.default);

describe('API Tests', function () {
  // Describe the API test suite
  /**
   * @function Describe User signup and signin
   */
  describe('User signup and signin', function () {
    // Describe User signup and signin suite
    /**
     * @function Signup suite
     */
    describe('# Signup', function () {
      it('should create a user', function (done) {
        requestApp.post('/api/users/signup').send(user).end(function (err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should create an admin', function (done) {
        requestApp.post('/api/users/signup').send(admin).end(function (err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user with same email address twice', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/users/signup').send(user).end(function (err, res) {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user if one or more field is empty', function (done) {
        (0, _supertest2.default)(_app2.default).post('/api/users/signup').send({}).end(function (err, res) {
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
    describe('# Signin', function () {
      it('should log a user in', function (done) {
        requestApp = (0, _supertest2.default)(_app2.default);
        requestApp.post('/api/users/signin').send(user).end(function (err, res) {
          setUser = res.body;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should log an admin in', function (done) {
        requestApp = (0, _supertest2.default)(_app2.default);
        requestApp.post('/api/users/signin').send(admin).end(function (err, res) {
          setAdmin = res.body;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong email address', function (done) {
        user.email = 'wrong@email.com';
        (0, _supertest2.default)(_app2.default).post('/api/users/signin').send(user).end(function (err, res) {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong password', function (done) {
        user.password = '2345';
        user.email = email;
        (0, _supertest2.default)(_app2.default).post('/api/users/signin').send(user).end(function (err, res) {
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
  describe('Books', function () {
    var bookId = '';
    describe('# Admin', function () {
      it('should be able to add a book', function (done) {
        var token = setAdmin.token;
        requestApp.post('/api/books').send(book).set('authenticate-token', token).end(function (err, res) {
          bookId = res.body.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Created');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should be able to edit a book', function (done) {
        var token = setAdmin.token;
        book.title = 'Purple Hibiscus';
        book.description = 'Purple Hibiscus was written by Chimamanda Adichie';
        requestApp.put('/api/books?book_id=' + bookId).send(book).set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
      /**
      * @function Describe Stocks Manager Suite
      */
      describe('# Stocks', function () {
        // Describe Books Stocks
        it('should be able to add a stock', function (done) {
          var token = setAdmin.token;
          stock.book_id = bookId;
          requestApp.post('/api/books/stocks').send(stock).set('authenticate-token', token).end(function (err, res) {
            stockId = res.body.id;
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('Created');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
        });

        it('should be able to get all stocks', function (done) {
          var token = setAdmin.token;
          requestApp.get('/api/books/stocks').send().set('authenticate-token', token).end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('OK');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
        });

        it('should delete stock with id ' + stockId, function (done) {
          var token = setAdmin.token;
          requestApp.delete('/api/books/stocks?id=' + stockId).set('authenticate-token', token).end(function (err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body.status).to.equal('OK');
            expect(res.body).to.be.an('object');
            if (err) return done(err);
            done();
          });
        });
      });
    });

    describe('# User', function () {
      // Describe Authenticate middleware
      var borrowedBookId = '';
      it('should be able to get all the books in the Library', function (done) {
        var token = setUser.token;
        requestApp.get('/api/books').set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should be able to borrow a book', function (done) {
        var token = setUser.token;
        var userId = setUser.userId;
        // book.book_id = bookId;
        requestApp.post('/api/users/' + userId + '/books?book_id=' + bookId).send({ return_date: '10-09-2017' }).set('authenticate-token', token).end(function (err, res) {
          borrowedBookId = res.body.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.status).to.equal('Created');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should be able to get list of books they are yet to return', function (done) {
        var userId = setUser.userId;
        var token = setUser.token;
        requestApp.get('/api/users/' + userId + '/books?returned=false').set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should be able to return a book', function (done) {
        var userId = setUser.userId;
        var token = setUser.token;
        requestApp.put('/api/users/' + userId + '/books?id=' + borrowedBookId).send({ book_id: bookId }).set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });
  });

  describe('Middlewares', function () {
    // Describe Middlewares
    describe('# Authenticate', function () {
      // Describe Authenticate middleware
      it('should return Unauthorized status', function (done) {
        (0, _supertest2.default)(_app2.default).get('/api/books').set('authenticate-token', 'invalidToken').end(function (err, res) {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal('Unauthorized');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });

    describe('# User Authenticate', function () {
      // Describe Authenticate middleware
      it('should return OK status', function (done) {
        var userId = setUser.userId;
        var token = setUser.token;
        requestApp.get('/api/users/' + userId + '/books?returned=false').set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });

    describe('# Admin Authenticate', function () {
      // Describe Authenticate middleware
      it('normal user should not be able to view admin page', function (done) {
        var token = setUser.token;
        requestApp.get('/api/books/stocks').set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal('Forbidden');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('admin user should be able to view admin page', function (done) {
        var token = setAdmin.token;
        requestApp.get('/api/books/stocks').set('authenticate-token', token).end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal('OK');
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });
  });
});