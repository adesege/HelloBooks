import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (fields, type) => {
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
