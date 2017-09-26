import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../form/Button';
import BooksList from './BooksList';
import { getBooks, setBooks } from '../../../actions/books';
import { addFlashMessage } from '../../../actions/flashMessages';

const $ = window.$;
/* eslint-disable require-jsdoc, class-methods-use-this */
class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: ''
    };
    this.goToAddPage = this.goToAddPage.bind(this);
  }

  goToEditPage(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }

  confirmDelete(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }

  componentDidMount() {
    this.props.getBooks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.books !== nextProps.books) {
      this.setState({
        books: nextProps.books
      });
    }
  }

  goToAddPage(event) {
    this.context.router.push('/books/add');
  }

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
          content={this.state.books}
          userGroup={this.props.group}
          goToEditPage={this.goToEditPage}
          confirmDelete={this.confirmDelete}
        />
      </div>
    );
  }
}
Books.proptypes = {
  books: PropTypes.array.isRequired,
  getBooks: PropTypes.func.isRequired
};

Books.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.books,
  group: state.auth.user.group
});

export default connect(mapStateToProps,
  { getBooks,
    addFlashMessage,
    setBooks
  })(Books);
