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

  if (!Validator.isEmail(email)) {
    errors.email = 'This field is not a valid email address';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'This field is required';
  }

  if (type === "signup" || type === "login" || type === "change-password") {
    if (!Validator.isLength(password, { min: 4 })) {
      errors.password = 'Password must have a minimum of 4 characters';
    }

    if (Validator.isEmpty(password)) {
      errors.password = 'This field is required';
    }
  }

  if (type === "signup" || type === "change-password") {
    if (!Validator.equals(confirmPassword, password)) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'This field is required';
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
