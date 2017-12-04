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
 * @class Books
 * @extends {React.Component}
 */
class Books extends React.Component {
  /**
     * Creates an instance of Books.
     * @param {object} props
     * @memberof Books
     */
  constructor(props) {
    super(props);
    this.goToAddPage = this.goToAddPage.bind(this);
  }

  /**
     * @returns {void}
     * @memberof Books
     */

  /**
     * @returns {void}
     * @param {object} event
     * @memberof Books
     */
  goToAddPage(event) {
    this.context.router.push('/books/add');
  }

  /**
     * @returns {object} JSX
     * @memberof Books
     */
  render() {
    return (
      <div>
        {this.props.children}
        <div className="toolaction">
          <Button
            type="button"
            icon="plus"
            iconClass="text-white"
            className="btn-success p-0"
            id="add-books-btn"
            onClick={this.goToAddPage}
          />
        </div>
        <h4 className="title mb-2 mr-4">Books</h4>
        <div className="mb-4">
          <small>View books</small>
        </div>
        <BooksList />
      </div>
    );
  }
}

Books.contextTypes = contextTypes;
Books.propTypes = propTypes;

export { Books };
export default Books;
