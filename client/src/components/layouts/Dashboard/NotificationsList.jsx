import React from 'react';
import Timestamp from 'react-timestamp';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';
import { userAvatar } from 'utils';

/**
 * notification type function
 *
 * @param {string} type - notification type
 *
 * @returns {string} returned or borrowed status
*/
const notificationType = (type) => {
  let text = '';
  switch (type) {
  case 'BOOK_BORROWED':
    text = "borrowed";
    break;
  case 'BOOK_RETURNED':
    text = "returned";
    break;
  default: text = '';
    break;
  }
  return text;
};
const propTypes = {
  notifications: PropTypes.array.isRequired,
  isPagination: PropTypes.bool.isRequired
};

const defaultProps = {
  isPagination: true
};

/**
 * Notification list component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
 */
const NotificationList = ({
  notifications,
  isPagination
}) => (
  <div>
    {notifications.length !== 0 ?
      <div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="row p-3 mx-auto notification align-items-center">
            <div className="col-sm-1 col-1 col-md-1 text-center px-0 col-lg-1">
              <img
                className="rounded-circle img-thumbnail w-100"
                alt=""
                src={userAvatar(notification.User.email)}
                style={{ borderRadius: '50px' }}/>
            </div>
            <div className="col-sm-11 col-11 col-md-11 col-lg-11 pr-0">
              <p className="mb-0">{notification.User.name} &nbsp;
                <span className="text-muted">
                  {notificationType(notification.notificationType)}
                </span>
            &nbsp;
                <strong>{notification.Book.title}</strong>
             &nbsp;
                <small>by {notification.Book.author}</small>
              </p>
              <small>
                <Timestamp
                  time={notification.updatedAt}
                  format="ago"
                  precision={1} />
              </small>
            </div>
          </div>
        ))}
      </div> :
      <EmptyMessage
        absolute={false}
      />}
    <Link
      className="btn btn-primary btn-sm btn-block"
      to="/notifications">
    See more
    </Link>
  </div>
);

NotificationList.propTypes = propTypes;
NotificationList.defaultProps = defaultProps;

export default NotificationList;
