import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import user from '../seeds/user';

const { expect } = chai;
const request = supertest(app);
const { email } = user;
let newUser;
let validationKey = '';

/**
  * @function Reset Password suite
*/
describe('# Reset password', () => {
  it('should not send mail if email address cannot be found', (done) => {
    request
      .post('/api/v1/users/reset-password')
      .send({ email: 'meandyoutoday@us.com' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No account is associated with this email address');
        if (err) return done(err);
        done();
      });
  });


  it('should send user a reset password mail', (done) => {
    request.post('/api/v1/users/reset-password').send({ email })
      .end((err, res) => {
        validationKey = res.body.key;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal(`A password reset link has been sent to ${email}. It may take upto 5 mins for the mail to arrive.`);
        expect(res.body).to.have.property('key');
        if (err) return done(err);
        done();
      });
  });

  it('should not change password if passwords are not the same', (done) => {
    request.post('/api/v1/users/reset-password/verify').send({
      validationKey,
      email,
      password: '1234',
      confirmPassword: '1235'
    })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('The passwords are not the same');
        if (err) return done(err);
        done();
      });
  });

  it('should not change password if validation key and email cannot be found', (done) => {
    request.post('/api/v1/users/reset-password/verify').send({
      validationKey: 'wrong key',
      email: 'invalid email address',
      password: '1234',
      confirmPassword: '1234'
    })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('There was an error completing your request. Perhaps, you followed a broken link.');
        if (err) return done(err);
        done();
      });
  });

  it('should update password and send user a reset password successful mail', (done) => {
    newUser = {
      ...user,
      validationKey
    };
    request
      .post('/api/v1/users/reset-password/verify').send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Password successfully changed. Please login to your account.');
        if (err) return done(err);
        done();
      });
  });
});
