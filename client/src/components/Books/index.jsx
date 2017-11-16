import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBooks, setBooks } from 'actions/books';
import { addFlashMessage } from 'actions/flashMessages';
import Button from 'form/Button';
import BooksList from './BooksList';

const { $ } = window;

/**
 * @class Books
 * @extends {React.Component}
 */
class Books extends React.Component {
  /**
     * Creates an instance of Books.
     * @param {any} props
     * @memberof Books
     */
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.goToAddPage = this.goToAddPage.bind(this);
  }

  /**
     * @returns {void}
     * @memberof Books
     */
  componentDidMount() {
    this.props.getBooks();
  }

  /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof Books
     */
  componentWillReceiveProps(nextProps) {
    if (this.props.books !== nextProps.books) {
      this.setState({
        books: nextProps.books
      });
    }
  }

  /**
     * @returns {void}
     * @param {object} event
     * @memberof Books
     */
  goToEditPage(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }

  /**
     * @returns {void}
     * @param {object} event
     * @memberof Books
     */
  confirmDelete(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }

  /**
     * @returns {void}
     * @param {any} event
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
        <form className="form-inline mb-4">
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by status...</option>
            <option value="">Active</option>
            <option value="">Pending approval</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <input
            type="text"
            className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0"
            placeholder="by author"/>
          <button
            type="submit"
            className="btn btn-sm btn-warning">
          filter
          </button>
        </form>
        <BooksList
          books={this.state.books}
          userGroup={this.props.group}
          goToEditPage={this.goToEditPage}
          confirmDelete={this.confirmDelete}
        />
      </div>
    );
  }
}
Books.propTypes = {
  books: PropTypes.array.isRequired,
  getBooks: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  setBooks: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
  children: PropTypes.node
};

Books.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.books,
  group: state.auth.user.group
});

export default connect(
  mapStateToProps,
  {
    getBooks,
    addFlashMessage,
    setBooks
  }
)(Books);
