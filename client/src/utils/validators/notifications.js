import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Handles notifications validation
 *
 * @returns {object} error messages
 *
 * @param {object} fields - fields to validate
 */
const notifications = (fields) => {
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

export default notifications;
