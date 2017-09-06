import React from 'react';
import PropTypes from 'prop-types';

const BooksList = ({ content }) => {
  const emptyMessage = (
    <h1>Books empty</h1>
  );
  const booksList = (
    <h1>Books</h1>
  );
  return (
    <div>
      {
        Object.keys(content).length === 0
          ? emptyMessage
          : booksList
      }
    </div>
  );
};

BooksList.propTypes = {
  content: PropTypes.array.isRequired
};
export default BooksList;
