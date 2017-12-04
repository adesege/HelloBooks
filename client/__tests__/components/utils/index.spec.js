import React from 'react';
import {
  showCoverPhoto,
  isValidUrl,
  parseCloudinaryURL,
  isImage,
  isPDF,
  extractURLQuery
} from 'utils';

describe('# Utils', () => {
  it('should return default coverphoto', () => {
    const coverPhoto = showCoverPhoto();
    expect(coverPhoto).toBeDefined();
  });
  it('should return boolean value if parameter is a valid url', () => {
    const isValid = isValidUrl('http://localhost.com');
    expect(isValid).toBeDefined();
    expect(isValid).toBe(true);
  });

  describe('Parse Cloudinary Url', () => {
    it('should return cloudinary public id', () => {
      const url = parseCloudinaryURL('https://res.cloudinary.com/adesege/image/upload/v1510497013/sibhkjqkvjruptnrakr6.png');
      expect(url.public_id).toBeDefined();
      expect(url.public_id).toBe('sibhkjqkvjruptnrakr6');
    });
    it('should return empty string if g', () => {
      const url = parseCloudinaryURL('https://localhost.com/unknown/url');
      expect(url.public_id).toBeDefined();
      expect(url.public_id).toBe('');
    });
  });
  describe('isImage', () => {
    it('should return true if parameter is image', () => {
      const image = isImage('image/png;base64:1234546465432345');
      expect(image).toBeDefined();
      expect(image).toBe(true);
    });
    it('should return false if parameter is not image', () => {
      const image = isImage('unknown/image');
      expect(image).toBeDefined();
      expect(image).toBe(false);
    });
  });
  describe('isPDF', () => {
    it('should return true if parameter is PDF', () => {
      const pdf = isPDF('application/pdf;base64:234567654');
      expect(pdf).toBeDefined();
      expect(pdf).toBe(true);
    });
    it('should return false if parameter is not a PDF', () => {
      const pdf = isPDF('unknown/pdf');
      expect(pdf).toBeDefined();
      expect(pdf).toBe(false);
    });
  });
  describe('extractURLQuery', () => {
    it('should extract query strings from url', () => {
      const queryStrings = extractURLQuery('http://localhost/?query=hello-world');
      expect(queryStrings).toBeDefined();
    });
  });
});
