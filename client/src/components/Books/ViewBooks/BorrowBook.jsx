import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const propTypes = {
  bookId: PropTypes.string.isRequired,
  isBorrowedBook: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  borrowBookAction: PropTypes.func.isRequired,
  returnBorrowedBookAction: PropTypes.func.isRequired,
  borrowedBook: PropTypes.object.isRequired
};

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
      isBorrowedBook: false,
      isDropdownOpen: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.returnBorrowedBook = this.returnBorrowedBook.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }


  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof BorrowBook
     */
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.borrowedBook).length !== 0 && nextProps.borrowedBook !== this.props.borrowedBook) {
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
   * @returns {void}
   * @memberof BorrowBook
   */
  toggleDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  }

  /**
     * @returns  {object} JSX
     * @memberof BorrowBook
     */
  render() {
    const { isBorrowedBook } = this.state;
    return (
      <ButtonDropdown
        group={false}
        isOpen={this.state.isDropdownOpen}
        toggle={this.toggleDropdown}>
        <DropdownToggle caret className="btn-block">
        I want to
        </DropdownToggle>
        <DropdownMenu>
          {!isBorrowedBook ?
            <DropdownItem
              onClick={this.onSubmit}>
              borrow
            </DropdownItem> :
            (<DropdownItem
              onClick={this.returnBorrowedBook}>
                return this book
            </DropdownItem>)
          }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

BorrowBook.propTypes = propTypes;

export default BorrowBook;
