import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import user from '../seeds/user';

const { expect } = chai;
const request = supertest(app);
let newUser;

describe('User account', () => {
  /**
     * @function Signup suite
  */
  describe('# Signup', () => {
    it(
      'should create a user',
      (done) => {
        request
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            global.user = res.body.payload; // set user object as global varibale
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.payload).to.have.property('token');
            expect(res.body.payload).to.have.property('userId');
            expect(res.body.payload.group).to.equal('user');
            expect(res.body.message[0]).to.equal('Your account has been created successfully');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should create an admin user',
      (done) => {
        newUser = {
          ...user,
          email: 'admintest@hellobooks.com',
          group: 'admin'
        };
        request
          .post('/api/v1/users/signup')
          .send(newUser)
          .end((err, res) => {
            global.admin = res.body.payload; // set user object as global varibale
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.payload).to.have.property('token');
            expect(res.body.payload).to.have.property('userId');
            expect(res.body.payload.group).to.equal('admin');
            expect(res.body.message[0]).to.equal('Your account has been created successfully');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should not create a user using the same email address more than once',
      (done) => {
        request
          .post('/api/v1/users/signup')
          .send(user)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('This email address already belongs to a user');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should not create a user if the password does not match',
      (done) => {
        newUser = {
          ...user,
          confirmPassword: 'hdvkhjdfvd'
        };

        request
          .post('/api/v1/users/signup')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('The password field is not the same');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should not create a user if one or more field is empty',
      (done) => {
        request
          .post('/api/v1/users/signup')
          .send({})
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message).to.be.an('array');
            expect(res.body.message[0]).to.be.a('string');
            if (err) return done(err);
            done();
          });
      }
    );
  });

  /**
     * @function Signin suite
  */
  describe('# Signin', () => {
    it(
      'should not log a user in with a wrong email address',
      (done) => {
        newUser = {
          ...user,
          email: 'wrong@email.com'
        };
        request
          .post('/api/v1/users/signin')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Sorry, we can\'t find this account');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should not log a user in with a wrong oauthID',
      (done) => {
        newUser = {
          ...user,
          oauthID: '345678976543'
        };
        request
          .post('/api/v1/users/signin')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Sorry, we can\'t find this account');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should not log a user in with a wrong password',
      (done) => {
        newUser = {
          ...user,
          password: '2345'
        };
        request
          .post('/api/v1/users/signin')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('You provided a wrong email address and password');
            if (err) return done(err);
            done();
          });
      }
    );

    it(
      'should log a user in',
      (done) => {
        request
          .post('/api/v1/users/signin')
          .send(user)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Successfully validated');
            expect(res.body.payload).to.have.property('token');
            expect(res.body.payload).to.have.property('userId');
            if (err) return done(err);
            done();
          });
      }
    );
  });
});

