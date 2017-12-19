import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  borrowBook,
  getBorrowedBooks,
  returnBorrowedBook
} from 'actions/borrowedBooks';
import { showCoverPhoto } from 'utils/';
import { getBooks } from 'actions/books';
import disqus from 'config/disqus';
import config from 'config';
import BorrowBook from './BorrowBook';
import BookComment from './BookComment';

const propTypes = {
  book: PropTypes.object,
  userId: PropTypes.number.isRequired,
  borrowedBook: PropTypes.object,
  borrowBookAction: PropTypes.func.isRequired,
  getBorrowedBooksAction: PropTypes.func.isRequired,
  returnBorrowedBookAction: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * View books modal
 *
 * @class ViewBooks
 *
 * @extends {React.Component}
 */
class ViewBooks extends React.Component {
  /**
   * Creates an instance of ViewBooks.
   *
   * @param {object} props
   *
   * @memberof ViewBooks
  */
  constructor(props) {
    super(props);
    const { userId, params } = this.props;
    this.state = {
      book: this.props.book ? this.props.book : {
        Category: {
          name: ''
        }
      },
      borrowBook: {
        userId,
        bookId: params.id
      },
      borrowedBook: {},
      borrowedBookId: 0,
      isDropdownOpen: false,
      isBorrowedBook: false,
      isLoading: false
    };
    this.onBorrowBook = this.onBorrowBook.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onReturnBorrowedBook = this.onReturnBorrowedBook.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }


  /**
   * Lifecycle method invoked when component did mount
   *
   * @returns {undefined}
   *
   * @memberof ViewBooks
   */
  componentDidMount() {
    const { params } = this.props;
    this.props.getBooks({ id: params.id });
    this.props.getBorrowedBooksAction(this.state.borrowBook);
  }


  /**
   * Lifecycle method invoked when component receives props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof ViewBooks
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book) {
      this.setState({ book: nextProps.book });
    }
    if (nextProps.borrowedBook !== this.props.borrowedBook) {
      this.setState({
        borrowedBook: nextProps.borrowedBook,
        isBorrowedBook: !!nextProps.borrowedBook
      });
    }
    if (nextProps.borrowedBook && nextProps.borrowedBook.id) {
      this.setState({
        borrowedBookId: nextProps.borrowedBook.id
      });
    }
  }

  /**
   * Borrow a book
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ViewBooks
  */
  onBorrowBook(event) {
    event.preventDefault();
    const { borrowedBookId } = this.state;
    this.props.borrowBookAction({
      ...this.state.borrowBook,
      borrowedBookId
    })
      .then((response) => {
        this.setState({
          isBorrowedBook: true,
          borrowedBookId: response.data.id
        });
      });
  }


  /**
   * Return a borrowed book
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ViewBooks
  */
  onReturnBorrowedBook(event) {
    event.preventDefault();
    const { borrowedBookId } = this.state;
    this.props.returnBorrowedBookAction({
      ...this.state.borrowBook,
      borrowedBookId
    })
      .then((response) => {
        this.setState({
          isBorrowedBook: false,
          borrowedBookId: response.data.id
        });
      });
  }


  /**
   * Handle file input onChange event and set state according
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ViewBooks
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Toggle open dropdown modal
   *
   * @returns {undefined}
   *
   * @memberof BorrowBook
   */
  toggleDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  /**
   * Renders component
   *
   * @returns  {JSX} JSX
   *
   * @memberof ViewBooks
   */
  render() {
    const {
      id,
      title,
      author,
      coverPhotoPath,
      description,
      publishedDate,
      ISBN,
      Category
    } = this.state.book;
    return (
      <div className="row" id="borrowBook">
        <div className="col-sm-8 offset-sm-2">
          <div className="row" id="book-details">
            <div className="col-sm-4 col-lg-3 col-6">
              <img
                className="img-thumbnails cover"
                src={showCoverPhoto(coverPhotoPath)}
                alt={title}/>
              <BorrowBook
                onBorrowBook={this.onBorrowBook}
                isBorrowedBook={this.state.isBorrowedBook}
                onReturnBorrowedBook={this.onReturnBorrowedBook}
                isDropdownOpen={this.state.isDropdownOpen}
                toggleDropdown={this.toggleDropdown}
              />
            </div>
            <div className="col-sm-8 col-6 mt-3 mt-sm-0">
              <div className="details">
                <h4 className="card-title font-weight-bold">{title}</h4>
                <h6 className="card-subtitle">
              by {author}
                </h6>
                <p className="mt-3">{description}</p>
                <hr/>
                <small className="mt-1 d-block">
                  <em className="d-block">Published date: {publishedDate}</em>
                  <em className="d-block">ISSBN: {ISBN}</em>
                  <em className="d-block">Category: {Category.name}</em>
                </small>
              </div>
            </div>
          </div>
          <BookComment
            config={{
              url: `${config.ROOT_URL}/books/view/${id}`,
              identifier: `${id}`,
              shortname: disqus.shortName,
              title,
            }}
          />
        </div>

      </div>
    );
  }
}

ViewBooks.propTypes = propTypes;

ViewBooks.contextTypes = contextTypes;

/**
 * Get state from store
 *
 * @param {object} state
 * @param {object} props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = (state, props) => {
  const { params } = props;
  const { userId } = state.auth.user;
  return {
    book: state.books.books
      .find(book => parseInt(book.id, 10) === parseInt(params.id, 10)),
    userId,
    borrowedBook: state.borrowedBooks.find(borrowedBook =>
      (
        parseInt(borrowedBook.userId, 10) === parseInt(userId, 10)) &&
          (parseInt(borrowedBook.bookId, 10) === parseInt(params.id, 10)
          ))
  };
};

export { ViewBooks };
export default connect(
  mapStateToProps,
  {
    getBooks,
    borrowBookAction: borrowBook,
    getBorrowedBooksAction: getBorrowedBooks,
    returnBorrowedBookAction: returnBorrowedBook
  }
)(ViewBooks);
