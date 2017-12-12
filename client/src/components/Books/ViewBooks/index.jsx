import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  borrowBook,
  getBorrowedBook,
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
  getBorrowedBookAction: PropTypes.func.isRequired,
  returnBorrowedBookAction: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * @class ViewBooks
 * @extends {React.Component}
 */
class ViewBooks extends React.Component {
  /**
     * Creates an instance of ViewBooks.
     * @param {object} props
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
      borrowedBook: {}
    };
  }


  /**
   * @returns {void}
   * @memberof ViewBooks
   */
  componentDidMount() {
    const { params } = this.props;
    this.props.getBooks({ id: params.id });
    this.props.getBorrowedBookAction(this.state.borrowBook);
  }


  /**
   * @returns {void}
   * @param {object} nextProps
   * @memberof ViewBooks
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book) {
      this.setState({ book: nextProps.book });
    }
    if (nextProps.borrowedBook !== this.props.borrowedBook) {
      this.setState({ borrowedBook: nextProps.borrowedBook });
    }
  }

  /**
   * @returns  {object} JSX
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
    console.log(Category, '-----------');
    const {
      params,
      borrowBookAction,
      userId,
      returnBorrowedBookAction
    } = this.props;
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
                borrowBookAction={borrowBookAction}
                bookId={params.id}
                userId={userId}
                isBorrowedBook={!!this.props.borrowedBook}
                returnBorrowedBookAction={returnBorrowedBookAction}
                borrowedBook={this.state.borrowedBook} />
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

const mapStateToProps = (state, props) => {
  const { params } = props;
  const { userId } = state.auth.user;
  return {
    book: state.books.books.find(book => parseInt(book.id, 10) === parseInt(params.id, 10)),
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
    getBorrowedBookAction: getBorrowedBook,
    returnBorrowedBookAction: returnBorrowedBook
  }
)(ViewBooks);
