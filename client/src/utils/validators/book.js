import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Handles book validation
 *
 * @param {object} fields - fields to validate
 *
 * @returns {object} error messages
 */
const book = (fields) => {
  let errors = {};
  const {
    id,
    title,
    coverPhotoPath,
    bookCategoryId,
    author,
    stockQuantity,
    ISBN,
    publishedDate,
    description
  } = fields;

  if (Validator.isEmpty(title)) {
    errors.title = 'This field is required';
  }
  if (!id) {
    if (!Validator.isDataURI(coverPhotoPath)) {
      errors.coverPhotoPath = 'Please choose a cover photo to upload';
    }
  }
  if (Number.isNaN(parseInt(bookCategoryId, 10))) {
    errors.bookCategoryId = 'Please choose a book category';
  }

  if (Validator.isEmpty(author)) {
    errors.author = 'This field is required';
  }

  if (!id) {
    if (Number.isNaN(parseInt(stockQuantity, 10))) {
      errors.stockQuantity = 'This field must be of numeric type';
    }
  }

  if (Validator.isEmpty(`${publishedDate}`)) {
    errors.publishedDate = 'This field is required';
  }

  if (Validator.isEmpty(ISBN)) {
    errors.ISBN = 'Enter a valid ISBN Number';
  }

  if (Validator.isEmpty(description)) {
    errors.description = 'This field is required';
  }

  if (Number.isNaN(parseInt(publishedDate, 10))) {
    errors.publishedDate = 'Published year can only be of numeric type';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default book;
