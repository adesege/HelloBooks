import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router';
import Pagination from 'components/miscellaneous/Pagination';
import { showCoverPhoto } from 'utils/';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';
import { getHistories } from 'actions/histories';
import Filter from './Filter';

const propTypes = {
  histories: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  getHistoriesAction: PropTypes.func.isRequired,
  isReturned: PropTypes.bool,
  pagination: PropTypes.object.isRequired
};

/**
 * Histories list component
 *
 * @class List
 *
 * @extends {Component}
 */
class List extends Component {
  /**
     * Creates an instance of List.
     *
     * @param {object} props - component props
     *
     * @memberof List
     */
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
      },
      searchFilter: {
        offset: 0,
        limit: 0,
        updatedAt: '',
        orderBy: '',
        isReturned: this.props.isReturned
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }


  /**
   * Lifecycle method when component did mount
   *
   * @memberof List
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const {
      userId,
      isReturned
    } = this.props;
    this.props.getHistoriesAction({
      userId,
      isReturned
    });
  }

  /**
   * Life cycle method when component recieves props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof List
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.histories !== this.props.histories) {
      this.setState({ histories: nextProps.histories });
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
   * Get new record based on search, filter and pagination
   *
   * @returns {undefined}
   *
   * @param {number} pageNumber - current page number
   *
   * @memberof List
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
    }, () => {
      const { userId } = this.props;
      const data = {
        ...this.state.searchFilter,
        userId
      };
      this.props.getHistoriesAction(data);
    });
  }


  /**
   * Handle onChange event for form input
   *
   * @param {object} event - event handler
   *
   * @memberof List
   *
   * @returns {undefined}
   */
  onChangeInput(event) {
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
   * Search and filter histories
   *
   * @param {object} event - event handler
   *
   * @memberOo List
   *
   * @returns {undefined}
   */
  onSearchFilter(event) {
    event.preventDefault();
    const { userId } = this.props;
    const data = {
      ...this.state.searchFilter,
      userId
    };
    this.props.getHistoriesAction(data);
  }

  /**
   * Renders component
   *
   * @returns {object} JSX
   *
   * @memberof List
  */
  render() {
    return (
      <div>
        <Filter
          searchFilter={this.state.searchFilter}
          onChangeInput={this.onChangeInput}
          onSearchFilter={this.onSearchFilter}

        />
        {
          this.state.histories.length !== 0 ?
            <div>
              <div className="row pr-3" id="bookList">
                {this.state.histories.map((history, index) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 col-12 mb-4"
                    key={index}>
                    <div className="row">
                      <div className="col-sm-6 col-6 align-self-center">
                        <img
                          className="img-thumbnail"
                          src={showCoverPhoto(history.Book.coverPhotoPath)}
                          alt={history.Book.title}/>
                      </div>
                      <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                        <h6 className="mt-4 mt-sm-0 mb-0">
                          <Link
                            to={`/books/view/${history.Book.id}`}
                          >
                            {history.Book.title}</Link>
                        </h6>
                        <h6 className="mb-1 text-muted">
                          <small>{history.Book.author}</small>
                        </h6>
                        <p className="mb-0">
                          <small>
                            <Timestamp
                              time={history.Book.updatedAt}
                              format="ago"
                              precision={1} />
                          </small>
                        </p>
                        {history.isReturned ?
                          (<small>Returned</small>) :
                          (<small>Yet to return</small>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                pagination={{ ...this.state.pagination }}
                handlePageChange={this.handlePageChange}
              />
            </div> :
            <EmptyMessage absolute={false} />
        }
      </div>
    );
  }
}

List.propTypes = propTypes;

/**
 * Map state to props
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  histories: state.histories.histories,
  pagination: state.histories.pagination,
  userId: state.auth.user.userId
});

export { List };
export default connect(
  mapStateToProps,
  { getHistoriesAction: getHistories }
)(List);
