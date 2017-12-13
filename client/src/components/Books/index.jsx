import React from 'react';
import PropTypes from 'prop-types';

import Button from 'form/Button';
import BooksList from './BooksList';

const contextTypes = {
  router: PropTypes.object.isRequired
};
const propTypes = {
  children: PropTypes.object,
};

/**
 * Books component
 *
 * @param {object} props
 *
 * @param {object} context
 *
 * @returns {JSX} JSX
 */
const Books = (props, context) => {
  /**
   * Go to add book page
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Books
  */
  const goToAddPage = (event) => {
    context.router.push('/books/add');
  };

  return (
    <div>
      {props.children}
      <div className="toolaction">
        <Button
          type="button"
          icon="plus"
          iconClass="text-white"
          className="btn-success p-0"
          id="add-books-btn"
          onClick={goToAddPage}
        />
      </div>
      <h4 className="title mb-2 mr-4">Books</h4>
      <div className="mb-4">
        <small>View books</small>
      </div>
      <BooksList />
    </div>
  );
};

Books.contextTypes = contextTypes;
Books.propTypes = propTypes;

export default Books;
