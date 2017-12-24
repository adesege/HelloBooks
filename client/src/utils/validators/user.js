import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
* Handles user validation
*
* @param {object} fields - fields to validate
* @param {object} type - type of action that is being performed
*
* @returns {object} error messages
*/
const user = (fields, type) => {
  let errors = {};
  const {
    name,
    email,
    password,
    confirmPassword,
    oldPassword
  } = fields;

  if (type !== 'change-password-user') {
    if (!Validator.isEmail(email)) {
      errors.email = 'This field is not a valid email address';
    }

    if (Validator.isEmpty(email)) {
      errors.email = 'This field is required';
    }
  }

  if (type === "signup" ||
  type === "login" ||
  type === "change-password" ||
  type === "change-password-user") {
    if (!Validator.isLength(password, { min: 4 })) {
      errors.password = 'Password must have a minimum of 4 characters';
    }

    if (Validator.isEmpty(password)) {
      errors.password = 'This field is required';
    }
  }

  if (type === "signup" ||
  type === "change-password" ||
  type === "change-password-user") {
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

  if (type === "change-password-user") {
    if (!Validator.isLength(oldPassword, { min: 4 })) {
      errors.oldPassword = 'Old password must have a minimum of 4 characters';
    }

    if (Validator.isEmpty(oldPassword)) {
      errors.oldPassword = 'This field is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default user;
