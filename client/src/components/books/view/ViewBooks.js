import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { borrowBook, getBorrowedBook, returnBorrowedBook } from '../../../actions/borrowedBook';
import DashboardLeftSidebar from '../../dashboard/sidebar/Left';
import RelatedBooks from './RelatedBooks';
import BookComment from './BookComment';
import { getBook } from '../../../actions/books';
import BorrowBook from './BorrowBook';

/* eslint-disable require-jsdoc, class-methods-use-this */
class ViewBooks extends React.Component {
  constructor(props) {
    super(props);
    const { userId, params } = this.props;
    this.state = {
      book: this.props.book ? this.props.book : '',
      borrowBook: {
        userId,
        bookId: params.id
      }
    };
  }

  componentDidMount = () => {
    const { params } = this.props;
    this.props.getBook({ id: params.id });
    this.props.getBorrowedBookAction(this.state.borrowBook);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book) {
      this.setState({ book: nextProps.book });
    }
  }
  render() {
    const { title, author, coverPhotoPath, description, publishedDate, ISBN } = this.state.book;
    const { params, borrowBookAction, isBorrowedBook, borrowedBook, userId, returnBorrowedBookAction } = this.props;
    return (
      <div className="row" id="borrowBook">
        <div className="col-sm-8">
          <div className="row" id="book-details">
            <div className="col-sm-4">
              <img className="img-thumbnails cover" src={coverPhotoPath} alt="Card cap"/>

              <BorrowBook
                borrowBookAction={borrowBookAction}
                bookId={params.id}
                userId={userId}
                isBorrowedBook={isBorrowedBook}
                returnBorrowedBookAction={returnBorrowedBookAction}
                borrowedBook={borrowedBook} />
            </div>
            <div className="col-sm-8 mt-3 mt-sm-0">
              <div className="details">
                <h4 className="card-title font-weight-bold">{title}</h4>
                <h6 className="card-subtitle">
              by {author}
                  <div className="rating d-inline">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                  </div>
                </h6>
                <p className="mt-3">{description}</p>
                <hr/>
                <small className="mt-1 d-block">
                  <em className="d-block">Published date: {publishedDate}</em>
                  <em className="d-block">ISSBN: {ISBN}</em>
                  <em className="d-block">Category: Category 1</em>
                </small>
              </div>
            </div>
          </div>

          <RelatedBooks />
          <BookComment />
        </div>

        <DashboardLeftSidebar className="col-sm-4"/>

      </div>
    );
  }
}

ViewBooks.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const userId = state.auth.user.userId;
  const bookId = state.book.id;
  const borrowedBook = state.borrowedBook || {};
  return {
    book: state.book,
    isBorrowedBook:
    !!((borrowedBook.userId === userId) && (borrowedBook.bookId === bookId)),
    userId,
    borrowedBook
  };
};

export default connect(mapStateToProps,
  { getBook,
    borrowBookAction: borrowBook,
    getBorrowedBookAction: getBorrowedBook,
    returnBorrowedBookAction: returnBorrowedBook
  })(ViewBooks);
