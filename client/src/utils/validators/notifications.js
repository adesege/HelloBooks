import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @returns {object} validation result
 * @param {object} fields
 * @param {string} type
 */
export default (fields, type) => {
  let errors = {};
  const {
    notificationType
  } = fields;

  if (Validator.isEmpty(notificationType)) {
    errors.notificationType = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
