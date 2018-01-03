import React from 'react';
import bookValidator from 'utils/validators/book';

describe('# Book Utils', () => {
  const fields = {
    id: 1,
    title: '',
    coverPhotoPath: '',
    bookCategoryId: '',
    author: '',
    stockQuantity: '',
    ISBN: '',
    publishedDate: '',
    description: ''
  };
  it('should return errors object if one or more field is invalid', () => {
    const { errors, isValid } = bookValidator(fields);
    expect(errors).toBeDefined();
    expect(isValid).toBe(false);
  });
  it('should return errors object if id field is false', () => {
    const newFields = {
      ...fields,
      id: 0
    };
    const { errors, isValid } = bookValidator(newFields);
    expect(errors).toBeDefined();
    expect(errors.coverPhotoPath)
    .toBe('Please choose a cover photo to upload');
    expect(isValid).toBe(false);
  });
});
