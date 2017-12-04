import React from 'react';
import userValidator from 'utils/validators/user';

describe('# User Utils', () => {
  const fields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: ''
  };
  it('should return errors object if one or more field is invalid', () => {
    const { errors, isValid } = userValidator(fields);
    expect(errors).toBeDefined();
    expect(isValid).toBe(false);
  });
  it('should return errors object when type is signup', () => {
    const newFields = {
      ...fields,
      password: 'password'
    };
    const { errors, isValid } = userValidator(newFields, 'signup');
    expect(errors).toBeDefined();
    expect(errors.confirmPassword).toBe('This field is required');
    expect(isValid).toBe(false);
  });
  it('should return errors object when type is change-password-user', () => {
    const { errors, isValid } = userValidator(fields, 'change-password-user');
    expect(errors).toBeDefined();
    expect(errors.oldPassword).toBe('This field is required');
    expect(isValid).toBe(false);
  });
});
