import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const propTypes = {
  isBorrowedBook: PropTypes.bool.isRequired,
  onReturnBorrowedBook: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  onBorrowBook: PropTypes.func.isRequired
};

/**
 * Renders borrow book component
 *
 * @param {object} props  - component props
 *
 * @returns {JSX} JSX
 */
const BorrowBook = (props) => (
  <ButtonDropdown
    group={false}
    isOpen={props.isDropdownOpen}
    toggle={props.toggleDropdown}>
    <DropdownToggle caret className="btn-block">
        I want to
    </DropdownToggle>
    <DropdownMenu>
      {!props.isBorrowedBook ?
        <DropdownItem
          onClick={props.onBorrowBook}>
              borrow
        </DropdownItem> :
        (<DropdownItem
          onClick={props.onReturnBorrowedBook}>
                return this book
        </DropdownItem>)
      }
    </DropdownMenu>
  </ButtonDropdown>
);

BorrowBook.propTypes = propTypes;

export default BorrowBook;
