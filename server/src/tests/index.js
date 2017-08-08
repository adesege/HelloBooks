import chai from 'chai';
import request from 'supertest';
import faker from 'faker';
import app from '../app';

const expect = chai.expect;
const email = faker.internet.email();
const user = {
  name: 'Test Test',
  password: '1234',
  email
};

describe('API Tests', () => { // Describe the API test suite
  describe('User signup and signin', () => { // Describe User signup and signin suite
    describe('# Signup', () => {
      it('should create a user', (done) => {
        request(app).post('/api/users/signup').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user with same email address twice', (done) => {
        request(app).post('/api/users/signup').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not create a user if one or more field is empty', (done) => {
        request(app).post('/api/users/signup').send({}).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });

    describe('# Signin', () => {
      it('should log a user in', (done) => {
        request(app).post('/api/users/signin').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong email address', (done) => {
        user.email = 'wrong@email.com';
        request(app).post('/api/users/signin').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });

      it('should not log a user in with a wrong password', (done) => {
        user.password = '2345';
        user.email = email;
        request(app).post('/api/users/signin').send(user).end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          if (err) return done(err);
          done();
        });
      });
    });
  });
});
