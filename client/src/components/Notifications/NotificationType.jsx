import React from 'react';
import PropTypes from 'prop-types';
import Button from 'form/Button';

const propTypes = {
  type: PropTypes.string.isRequired
};
/**
 * Notification type component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
 */
const NotificationType = ({ type }) => {
  let buttonType;
  switch (type) {
  case 'BOOK_BORROWED':
    buttonType = (<span
      className="text-info mr-2 mb-2">
      <span className="hidden-xs-down">
        <i className="fa fa-info"/> &nbsp;
      borrowed
      </span>
    </span>);
    break;
  case 'BOOK_RETURNED':
    buttonType = (<span className="text-success mr-2 mb-2">
      <span className="hidden-xs-down">
        <i className="fa fa-check"/> &nbsp;
      returned</span>
    </span>);
    break;
  case 'BOOK_SURCHARGED':
    buttonType = (<Button className="btn-warning mr-2 mb-2" icon="check">
      <span className="hidden-xs-down">surcharged</span>
    </Button>);
    break;
  default: buttonType = '';
    break;
  }
  return (
    <div className="col-sm-3 col p-2 text-right">
      {buttonType}
    </div>
  );
};

NotificationType.propTypes = propTypes;


export default NotificationType;
