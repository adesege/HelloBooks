import chai from 'chai';
import Utils from '../../utils';

const { expect } = chai;

describe('Utils', () => {
  describe('# Random string', () => {
    it('should return a random string when the limit is specified', () => {
      expect(Utils.randomString(3)).to.be.a('string');
    });
    it('should return a random string when the limit is not specified', () => {
      expect(Utils.randomString()).to.be.a('string');
    });
  });

  describe('# Return Date', () => {
    it('should return all return date', () => {
      expect(Utils.returnDate()).to.be.an('object');
      expect(Utils.returnDate()).to.be.have.property('senior');
      expect(Utils.returnDate().senior).to.equal(10);
    });

    it('should return a user rank return date', () => {
      expect(Utils.returnDate('beginner')).to.be.a('number');
      expect(Utils.returnDate('beginner')).to.equal(3);
      expect(Utils.returnDate('enthusiast')).to.equal(13);
    });
  });
});
