import React from 'react';
import categoryValidator from 'utils/validators/category';

describe('# Category Utils', () => {
  const fields = {
    name: ''
  };
  it('should return errors object if one or more field is invalid', () => {
    const { errors, isValid } = categoryValidator(fields);
    expect(errors).toBeDefined();
    expect(errors.name).toBe('This field is required');
    expect(isValid).toBe(false);
  });
});
