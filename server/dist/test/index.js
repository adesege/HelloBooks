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
var name = 'Test Test';
var password = '1234';
var email = _faker2.default.internet.email();

describe('API Tests', function () {
  describe('# Signup', function () {
    it('should create a user', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/users/signup').send({ name: name, password: password, email: email }).end(function (err, res) {
        console.log(err);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
    });
  });
});