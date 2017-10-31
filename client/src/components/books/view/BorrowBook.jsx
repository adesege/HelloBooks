import React from 'react';
import PropTypes from 'prop-types';


/**
 * @class BorrowBook
 * @extends {React.Component}
 */
class BorrowBook extends React.Component {
  /**
     * Creates an instance of BorrowBook.
     * @param {any} props
     * @memberof BorrowBook
     */
  constructor(props) {
    super(props);
    const { userId, bookId } = this.props;
    this.state = {
      isLoading: false,
      userId,
      bookId,
      borrowedBookId: 0,
      isBorrowedBook: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.returnBorrowedBook = this.returnBorrowedBook.bind(this);
  }


  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof BorrowBook
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.borrowedBook !== this.props.borrowedBook) {
      const { id: borrowedBookId } = nextProps.borrowedBook;
      this.setState({
        borrowedBookId
      });
    }
    if (nextProps.isBorrowedBook !== this.props.isBorrowedBook) {
      this.setState({
        isBorrowedBook: nextProps.isBorrowedBook
      });
    }
  }


  /**
     * @returns {void}
     * @param {object} event
     * @memberof BorrowBook
     */
  onSubmit(event) {
    event.preventDefault();
    const { userId, bookId, borrowedBookId } = this.state;
    this.props.borrowBookAction({
      userId,
      bookId,
      borrowedBookId
    }).then((response) => {
      this.setState({
        isBorrowedBook: true,
        borrowedBookId: response.data.id
      });
    });
  }


  /**
     * @returns {void}
     * @param {any} event
     * @memberof BorrowBook
     */
  returnBorrowedBook(event) {
    event.preventDefault();
    const { userId, bookId, borrowedBookId } = this.state;
    this.props.returnBorrowedBookAction({
      userId,
      bookId,
      borrowedBookId
    }).then((response) => {
      this.setState({
        isBorrowedBook: false,
        borrowedBookId: response.data.id
      });
    });
  }


  /**
     * @returns {void}
     * @param {object} event
     * @memberof BorrowBook
     */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
     * @returns  {object} JSX
     * @memberof BorrowBook
     */
  render() {
    const { isBorrowedBook } = this.state;
    return (
      <div
        className="btn-group btn-group-sm w-100 my-2"
        role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          className="btn btn-primary btn-block dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"> I want to... </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a className="dropdown-item" href="#top">read</a>
          {!isBorrowedBook ?
            <a
              className="dropdown-item"
              onClick={this.onSubmit}
              href={''}>
            borrow
            </a> :
            <a
              className="dropdown-item"
              onClick={this.returnBorrowedBook}
              href={''}>
            return this book
            </a>
          }
        </div>
      </div>
    );
  }
}

BorrowBook.propTypes = {
  bookId: PropTypes.string.isRequired,
  isBorrowedBook: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  borrowBookAction: PropTypes.func.isRequired,
  returnBorrowedBookAction: PropTypes.func.isRequired,
  borrowedBook: PropTypes.object.isRequired
};

export default BorrowBook;
