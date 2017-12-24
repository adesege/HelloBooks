import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Handles book validation
 *
 * @param {object} fields - fields to validate
 *
 * @returns {object} error messages
 */
const category = (fields) => {
  let errors = {};
  const {
    name
  } = fields;

  if (Validator.isEmpty(name)) {
    errors.name = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default category;
