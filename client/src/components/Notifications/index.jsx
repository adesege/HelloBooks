import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotifications } from 'actions/notifications';
import LeftSidebar from './Sidebar';
import List from './List';

const propTypes = {
  getNotifications: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired
};

/**
 * Notifications component
 *
 * @class Notifications
 *
 * @extends {React.Component}
 */
class Notifications extends React.Component {
  /**
   * Creates an instance of Notifications.
   *
   * @param {object} props - component props
   *
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
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof Notifications
   */
  componentDidMount() {
    this.props.getNotifications();
  }
  /**
   * Lifecycle method invoked when component will receive props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps - lifecycle next props
   *
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
   * Handle search and filter form input onChange event
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
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
   * Search and filter notification
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
   * @memberof Notifications
   */
  onFilterSubmit(event) {
    event.preventDefault();
    this.props.getNotifications(this.state.searchFilter);
  }

  /**
   * Handle pageination
   *
   * @returns {undefined}
   *
   * @param {integer} pageNumber - current page number
   *
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
   * Render component
   *
   * @returns {JSX} JSX
   *
   * @memberof Notifications
   */
  render() {
    const {
      notifications, searchFilter, errors, pagination
    } = this.state;
    return (
      <div>
        <h4 className="title mb-2 mr-4">Notifications</h4>
        <div
          className="mb-4">
          <small>You can view all your notifications here</small>
        </div>
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

/**
 * Get state from store
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  pagination: state.notifications.pagination
});

export { Notifications };
export default connect(mapStateToProps, { getNotifications })(Notifications);
