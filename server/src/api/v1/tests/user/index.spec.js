import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import { user, admin } from '../seeds/user';
import { truncateUserTable } from '../seeds';

const { expect } = chai;
const request = supertest(app);
let newUser;

describe('User account', () => {
  before(() => {
    truncateUserTable();
  });

  describe('# Signup', () => {
    it(
      'should create a user',
      (done) => {
        newUser = {
          ...user,
          id: 3,
          email: 'usertest2@hellobooks.com'
        };
        request
          .post('/api/v1/users/signup')
          .send(newUser)
          .end((err, res) => {
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
          ...admin,
          id: 4,
          email: 'admintest3@hellobooks.com'
        };
        request
          .post('/api/v1/users/signup')
          .send(newUser)
          .end((err, res) => {
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
        newUser = {
          ...user,
          email: 'usertest2@hellobooks.com'
        };
        request
          .post('/api/v1/users/signup')
          .send(newUser)
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
            expect(res.body.message[0]).to.equal('The name field is required');
            expect(res.body.message[1]).to.equal('Name must contain alphabet characters only');
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
          email: 'usertest2@hellobooks.com',
          password: '34543245454'
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
        newUser = {
          ...user,
          email: 'usertest2@hellobooks.com',
        };
        request
          .post('/api/v1/users/signin')
          .send(newUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message[0]).to.equal('Successfully validated');
            expect(res.body.payload).to.have.property('token');
            expect(res.body.payload.userId).to.equal(1);
            expect(res.body.payload.group).to.equal('user');
            if (err) return done(err);
            done();
          });
      }
    );
  });
});

