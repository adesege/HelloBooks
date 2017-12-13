import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import { user } from '../seeds/user';
import { generateToken } from '../seeds';

const { expect } = chai;
const request = supertest(app);
let userId;
let token;


describe('# Profile', () => {
  before(() => {
    const {
      userToken,
      userId: id
    } = generateToken();
    token = userToken;
    userId = id;
  });
  it('should be able to get all users in the database', (done) => {
    request
      .get('/api/v1/users')
      .set('authenticate-token', token)
      .end((err, res) => {
        setTimeout(() => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0].email).to.equal(user.email);
        }, 1000);
        if (err) return done(err);
        done();
      });
  });

  it(
    'should not be able to change their password if the new password do not match the old one',
    (done) => {
      request
        .put(`/api/v1/users/${userId}`)
        .send({
          password: 'newPassword',
          confirmPassword: 'newPassword',
          oldPassword: '123454'
        })
        .set('authenticate-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message[0]).to.equal('Your old password does not match the current password');
          if (err) return done(err);
          done();
        });
    }
  );

  it('should be able to change their password', (done) => {
    request
      .put(`/api/v1/users/${userId}`)
      .send({
        password: 'newPassword',
        confirmPassword: 'newPassword',
        oldPassword: user.password
      })
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('User information has been successfully edited');
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to change their password if the passwords do not match', (done) => {
    request
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
        expect(res.body.message[0]).to.equal('The passwords are not the same');
        if (err) return done(err);
        done();
      });
  });

  it('should be able to get a particular user', (done) => {
    request
      .get(`/api/v1/users/${userId}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0].name).to.equal(user.name);
        expect(res.body.data[0].email).to.equal(user.email);
        if (err) return done(err);
        done();
      });
  });
});
