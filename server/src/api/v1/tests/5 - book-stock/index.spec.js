import chai from 'chai';
import supertest from 'supertest';
import app from '../../../../express';
import stock from '../seeds/stock';

const { expect } = chai;
const request = supertest(app);
let stockId;
let newStock;

/**
  * @function Describe Stocks Manager Suite
*/
describe('# Stocks', () => { // Describe Books Stocks
  it('should be able to add a stock', (done) => {
    const { token } = global.admin;
    newStock = {
      ...stock,
      bookId: global.bookId
    };
    request
      .post('/api/v1/books/stocks')
      .send(newStock)
      .set('authenticate-token', token)
      .end((err, res) => {
        stockId = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body.message[0]).to.equal('Stock added successfully');
        expect(res.body).to.be.an('object');
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to add a stock if the stock quantity is not provided', (done) => {
    const { token } = global.admin;
    newStock = {
      ...stock,
      bookId: global.bookId,
      quantity: ''
    };
    request
      .post('/api/v1/books/stocks')
      .send(newStock)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Quantity cannot be empty');
        if (err) return done(err);
        done();
      });
  });


  it('should not be able to add a stock if the book id cannot be found', (done) => {
    const { token } = global.admin;
    newStock = {
      ...stock,
      bookId: 123456765
    };
    request
      .post('/api/v1/books/stocks')
      .send(newStock)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Book not found');
        if (err) return done(err);
        done();
      });
  });


  it('should be able to get all stocks', (done) => {
    const { token } = global.admin;
    request
      .get(`/api/v1/books/stocks?bookId=${global.bookId}`)
      .send()
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.data[0]).to.have.property('id');
        if (err) return done(err);
        done();
      });
  });

  it(`should delete stock with id ${stockId}`, (done) => {
    const { token } = global.admin;
    request
      .delete(`/api/v1/books/stocks/${stockId}`)
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Stock deleted successfully');
        if (err) return done(err);
        done();
      });
  });

  it('should not be able to delete a stock with a wrong id', (done) => {
    const { token } = global.admin;
    request
      .delete('/api/v1/books/stocks/9878')
      .set('authenticate-token', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message[0]).to.equal('Stock not found');
        if (err) return done(err);
        done();
      });
  });
});
