import React from 'react';
import Timestamp from 'react-timestamp';
import PropTypes from 'prop-types';
import Pagination from 'components/miscellaneous/Pagination';
import user from 'assets/images/user.png';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';
import NotificationType from './NotificationType';

const propTypes = ({
  notifications: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isPagination: PropTypes.bool.isRequired
});

const defaultProps = ({
  isPagination: true
});

const List = ({
  notifications,
  pagination,
  handlePageChange,
  isPagination
}) => (
  <div>
    {notifications.length !== 0 ?
      <div>
        <div className="row">
          {notifications.map((notification, index) => (
            <div key={index} className="col-lg-4 mb-3 align-items-center">
              <div key={index} className="row bordered p-2 mx-auto h-100">
                <div className="col-sm-2 col-4 col-md-4 text-center px-0 col-lg-1">
                  <img
                    className="rounded-circle img-thumbnail w-100"
                    alt=""
                    src={user}/>
                </div>
                <div className="col-sm-10 col-8 col-md-8 col-lg-8 pr-0">
                  <p className="title font-weight-bold mb-1"> {notification.Book.title}
                    <small> by {notification.Book.author}</small>
                  </p>
                  <p className="small font-weight-bold mb-1"> {notification.User.name} </p>
                  <p className="small">
                    <i className="fa fa-calendar" />
                &nbsp;
                    <Timestamp
                      time={notification.updatedAt}
                      format="ago"
                      precision={1} />
                  </p>
                </div>
                <NotificationType type={notification.notificationType} />
              </div>
            </div>
          ))}
        </div>
        {isPagination && <Pagination
          pagination={{ ...pagination }}
          handlePageChange={handlePageChange}
        /> }
      </div> :
      <EmptyMessage text="Sorry, No record is available" />}
  </div>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
