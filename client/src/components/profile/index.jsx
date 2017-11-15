import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getBorrowedBooks,
  returnBorrowedBook
} from 'actions/borrowedBooks';
import { getUsers } from 'actions/users';
import BorrowedBooksList from './BorrowedBooksList';
import Info from './Info';

const { $ } = window;


/**
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
     * Creates an instance of Profile.
     * @param {any} props
     * @memberof Profile
     */
  constructor(props) {
    super(props);
    this.state = {
      borrowedBooks: [],
      user: {}
    };
    this.onReturnBook = this.onReturnBook.bind(this);
  }

  /**
     * @returns {void}
     * @memberof Profile
     */
  componentDidMount() {
    const { userId } = this.props;
    this.props.getBorrowedBooksAction({
      userId
    });
    this.props.getUsersAction({
      userId
    });
  }

  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof Profile
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.borrowedBooks !== this.props.borrowedBooks) {
      this.setState({ borrowedBooks: nextProps.borrowedBooks });
    }
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });
    }
  }
  /**
     * @returns {void}
     * @param {any} event
     * @memberof Profile
     */
  onReturnBook(event) {
    event.preventDefault();
    const { userId } = this.props;
    const bookId = $(event.target).parents('.actions').attr('data-bookId');
    const borrowedBookId = $(event.target).parents('.actions').attr('data-id');
    this.props.returnBorrowedBookAction({
      bookId,
      borrowedBookId,
      userId
    });
  }

  /**
     * @returns {object} JSX
     * @memberof Profile
     */
  render() {
    return (
      <div>
        <Info user={this.state.user} />
        <div className="row pr-3 pl-3" id="yetReturn">
          <div className="col-sm-8  offset-sm-2 px-0">
            <h6 className="title">I'm yet to return...</h6>
            <BorrowedBooksList
              content={this.state.borrowedBooks}
              onReturnBook={this.onReturnBook}
            />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getBorrowedBooksAction: PropTypes.func.isRequired,
  returnBorrowedBookAction: PropTypes.func.isRequired,
  getUsersAction: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userGroup: PropTypes.string.isRequired,
  borrowedBooks: PropTypes.array.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  const { userId } = state.auth.user;
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
