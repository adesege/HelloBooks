import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (fields, type) => {
  let errors = {};
  const {
    name,
    email,
    password,
    confirmPassword
  } = fields;

  if (Validator.isEmpty(email)) {
    errors.email = 'This field is required';
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'This field is not a valid email address';
  }

  if (type === "signup" || type === "login" || type === "change-password") {
    if (Validator.isEmpty(password)) {
      errors.password = 'This field is required';
    }

    if (!Validator.isLength(password, { min: 4 })) {
      errors.password = 'Password must have a minimum of 4 characters';
    }
  }

  if (type === "signup" || type === "change-password") {
    if (Validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'This field is required';
    }

    if (!Validator.equals(confirmPassword, password)) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  if (type === "signup") {
    if (Validator.isEmpty(name)) {
      errors.name = 'This field is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
