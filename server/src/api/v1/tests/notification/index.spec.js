import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import { user } from '../seeds/user';
import { generateToken } from '../seeds';

const { expect } = chai;
const request = supertest(app);
let token;

describe('# Notifications', () => {
  before(() => {
    const {
      adminToken
    } = generateToken();
    token = adminToken;
  });
  it('should get all notification in the database', (done) => {
    request
      .get('/api/v1/notifications')
      .set('authenticate-token', token)
      .end((err, res) => {
        setTimeout(() => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0].notificationType).to.equal('BOOK_RETURNED');
          expect(res.body.data[0].bookId).to.equal(global.bookId);
        }, 1000);
        if (err) return done(err);
        done();
      });
  });

  it('should get all notification in the database by name', (done) => {
    request
      .get(`/api/v1/notifications?name=${user.name}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        setTimeout(() => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.pagination).to.have.property('pageSize');
          expect(res.body.pagination.totalCount).to.equal(2);
          expect(res.body.data[0].notificationType).to.equal('BOOK_RETURNED');
          expect(res.body.data[0].bookId).to.equal(1);
        }, 1000);
        if (err) return done(err);
        done();
      });
  });
});
