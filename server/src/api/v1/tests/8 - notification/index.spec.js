import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import user from '../seeds/user';

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

  it('should get all notification in the database by name', (done) => {
    const { token } = global.admin;
    request
      .get(`/api/v1/notifications?name=${user.name}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.pagination).to.have.property('pageSize');
        if (err) return done(err);
        done();
      });
  });
});
