import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import { generateToken } from '../seeds';

const { expect } = chai;
const request = supertest(app);
let token;


describe('# Search', () => {
  before(() => {
    const {
      adminToken
    } = generateToken();
    token = adminToken;
  });
  it('should be able to search for a book', (done) => {
    request
      .get('/api/v1/search?q=purple&type=books')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.message[0]).to.equal('Book found');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0].title).to.equal('Purple Hibiscus is a new title');
        expect(res.body.data[0].description).to.equal('Purple Hibiscus was written by Chimamanda Adichie');
        if (err) return done(err);
        done();
      });
  });

  it('should return 400 if no query type is specified', (done) => {
    request
      .get('/api/v1/search?q=half')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message[0]).to.equal('Please specify a search type');
        if (err) return done(err);
        done();
      });
  });
});
