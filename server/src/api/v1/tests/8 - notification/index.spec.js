import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';

const { expect } = chai;
const request = supertest(app);

describe('# Notifications', () => {
  it('should get all notification in the database', (done) => {
    const { token } = global.admin;
    request
      .get('/api/v1/notifications')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        if (err) return done(err);
        done();
      });
  });
});
