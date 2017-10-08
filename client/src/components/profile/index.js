import React from 'react';
import { connect } from 'react-redux';
import LeftSidebar from './sidebar/Left';
import { getBorrowedBooks, returnBorrowedBook } from '../../actions/borrowedBooks';
import { getUsers } from '../../actions/users';
import BorrowedBooksList from './BorrowedBooksList';
import Info from './Info';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borrowedBooks: [],
      user: []
    };
    this.onReturnBook = this.onReturnBook.bind(this);
  }

  onReturnBook(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const bookId = $(event.target).parents('.actions').attr('data-bookId');
    const borrowedBookId = $(event.target).parents('.actions').attr('data-id');
    this.props.returnBorrowedBookAction({
      bookId,
      borrowedBookId,
      userId
    });
  }
  componentDidMount() {
    const { userId } = this.props;
    this.props.getBorrowedBooksAction({
      userId
    });
    this.props.getUsersAction({
      userId
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.borrowedBooks !== this.props.borrowedBooks) {
      this.setState({ borrowedBooks: nextProps.borrowedBooks });
    }
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });
    }
  }
  render() {
    return (
      <div>
        <Info user={this.state.user} />
        <div className="row pr-3 pl-3" id="yetReturn">
          <LeftSidebar />
          <div className="col-sm-8 px-0">
            <h6 className="title">I'm yet to return...</h6>
            <BorrowedBooksList
              content={this.state.borrowedBooks}
              onReturnBook={this.onReturnBook}
            />
            <button
              type="button"
              className="btn btn-primary bg-light btn-block mb-3">
          See more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.user.userId;
  return {
    userId,
    userGroup: state.auth.user.group,
    borrowedBooks: state.borrowedBooks,
    user: state.users
      .find(user => parseInt(user.id, 10) === parseInt(userId, 10))
  };
};

export default connect(mapStateToProps, {
  getBorrowedBooksAction: getBorrowedBooks,
  returnBorrowedBookAction: returnBorrowedBook,
  getUsersAction: getUsers
})(Profile);
