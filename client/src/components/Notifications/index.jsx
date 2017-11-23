import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotifications } from 'actions/notifications';
import LeftSidebar from './Sidebar';
import List from './List';

const propTypes = ({
  getNotifications: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired
});
/**
 * @class Notifications
 * @extends {React.Component}
 */
class Notifications extends React.Component {
  /**
   * Creates an instance of Notifications.
   * @param {object} props
   * @memberof Notifications
   */
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      searchFilter: {
        notificationType: '',
        name: '',
        offset: 0,
        limit: 0
      },
      errors: {},
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @returns {undefined}
   * @memberof Notifications
   */
  componentDidMount() {
    this.props.getNotifications();
  }
  /**
 *
 * @returns {undefined}
 * @param {object} nextProps
 * @memberof Notifications
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({ notifications: nextProps.notifications });
    }
    if (nextProps.pagination !== this.props.pagination) {
      this.setState({
        pagination: nextProps.pagination,
        searchFilter: {
          ...this.state.searchFilter,
          limit: nextProps.pagination.limit
        }
      });
    }
  }

  /**
   * @returns {undefined}
   * @param {object} event
   * @memberof Notifications
   */
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      searchFilter: {
        ...this.state.searchFilter,
        [name]: value
      }
    });
  }

  /**
   * @returns {undefined}
   * @param {any} event
   * @memberof Notifications
   */
  onFilterSubmit(event) {
    event.preventDefault();
    this.props.getNotifications(this.state.searchFilter);
  }

  /**
   * @returns {undefined}
   * @param {integer} pageNumber
   * @memberof Notifications
   */
  handlePageChange(pageNumber) {
    const offset = this.state.searchFilter.limit * (pageNumber - 1);
    this.setState({
      pagination: {
        ...this.state.pagination,
        page: pageNumber
      },
      searchFilter: {
        ...this.state.searchFilter,
        offset
      }
    }, () =>
      this.props.getNotifications(this.state.searchFilter));
  }

  /**
   * @returns {object} JSX
   * @memberof Notifications
   */
  render() {
    const {
      notifications, searchFilter, errors, pagination
    } = this.state;
    return (
      <div>
        <h4 className="title mb-2 mr-4">Notifications</h4>
        <div className="mb-4"><small>You can view all your notifications here</small></div>
        <div className="row">
          <LeftSidebar
            searchFilter={searchFilter}
            handleInputChange={this.handleInputChange}
            onFilterSubmit={this.onFilterSubmit}
            errors={errors}
          />
          <div className="col-sm-8 col-md-8 col-lg-9">
            <List
              notifications={notifications}
              pagination={{ ...pagination }}
              handlePageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = propTypes;

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  pagination: state.notifications.pagination
});

export default connect(mapStateToProps, { getNotifications })(Notifications);
