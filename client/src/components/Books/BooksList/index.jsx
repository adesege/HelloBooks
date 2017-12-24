import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showCoverPhoto } from 'utils';
import Pagination from 'components/miscellaneous/Pagination';
import { getBooks, setBooks } from 'actions/books';
import { getBookCategories } from 'actions/categories';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';
import SearchFilter from './SearchFilter';

const propTypes = {
  books: PropTypes.array.isRequired,
  userGroup: PropTypes.string,
  goToEditPage: PropTypes.func,
  confirmDelete: PropTypes.func,
  pagination: PropTypes.object,
  handlePageChange: PropTypes.func,
  getBooks: PropTypes.func.isRequired,
  getBookCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Renders books as a list
 *
 * @class BooksList
 *
 * @extends {Component}
 */
class BooksList extends Component {
  /**
     * Creates an instance of BooksList.
     *
     * @param {object} props - component props
     *
     * @memberof BooksList
     */
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      categories: [],
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
      },
      searchFilter: {
        offset: 0,
        limit: 0,
        author: '',
        title: '',
        bookCategoryId: 0
      },
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }


  /**
   * Gets books and book categories
   *
   * @memberof BooksList
   *
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getBooks();
    this.props.getBookCategories();
  }

  /**
   * Lifecycle method invoked when component receives props
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof BooksList
   *
   * @returns {undefined}
  */
  componentWillReceiveProps(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      this.setState({
        categories: nextProps.categories
      });
    }
    if (this.props.books !== nextProps.books) {
      this.setState({
        books: nextProps.books
      });
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
   * Go to edit book page
   *
   * @param {object} event - event handler
   *
   * @memberof BooksList
   *
   * @returns {undefined}
  */
  goToEditPage(event) {
    event.preventDefault();
    const { id } = event.target;
    this.context.router.push(`/books/edit/${id}`);
  }

  /**
   * Go to confirm delete book page
   *
   * @param {object} event - event handler
   *
   * @memberof BooksList
   *
   * @returns {undefined}
  */
  confirmDelete(event) {
    event.preventDefault();
    const { id } = event.target;
    this.context.router.push(`/books/delete/${id}`);
  }

  /**
   * Get new record based on search, filter and pagination
   *
   * @param {number} pageNumber - current page number
   *
   * @memberof BooksList
   *
   * @returns {undefined}
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
      this.props.getBooks(this.state.searchFilter));
  }

  /**
   * Handle form input onChange event and set state according
   *
   * @param {object} event - event handler
   *
   * @memberof Notifications
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
   * Search and filter books
   *
   * @param {object} event - event handler
   *
   * @memberof Notifications
   *
   * @returns {undefined}
  */
  onSearchFilter(event) {
    event.preventDefault();
    this.props.getBooks(this.state.searchFilter);
  }

  /**
   * Renders the component
   *
   * @memberof BooksList
   *
   * @returns {JSX} JSX
  */
  render() {
    return (
      <div>
        <SearchFilter
          categories={this.state.categories}
          searchFilter={this.state.searchFilter}
          onChangeInput={this.onChangeInput}
          onSearchFilter={this.onSearchFilter}
        />
        {
          this.state.books.length !== 0 ?
            <div>
              <div className="row pr-3" id="bookList">
                {this.state.books.map((object, index) => (
                  <div
                    className=
                      "col-sm-3 col-md-3 col-6 col-lg-3 \
                     col-xl-2 pr-0 col-6 mb-4 book"
                    key={index}>
                    <Link
                      to={`/books/view/${object.id}`}
                      className="h-100"
                      style={{ position: 'unset', display: 'block' }}
                    >
                      <img
                        className="img-thumbnail w-100 h-100"
                        src={showCoverPhoto(object.coverPhotoPath)}
                        alt={object.title}/>
                    </Link>
                    <div className="actions ml-3 mb-3">
                      {this.props.userGroup === 'admin' && <span>
                        <i
                          className=
                            "btn btn-sm btn-info card-link \
                             m-0 mr-2 fa fa-pencil"
                          onClick={this.goToEditPage.bind(this)}
                          id={object.id}
                        />
                        <i className=
                          "btn btn-sm btn-danger card-link \
                         m-0 mr-2 fa fa-remove"
                        onClick={this.confirmDelete.bind(this)}
                        id={object.id}
                        />
                      </span>
                      }
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

BooksList.propTypes = propTypes;
BooksList.contextTypes = contextTypes;

/**
 * Get state from store
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  books: state.books.books,
  pagination: state.books.pagination,
  userGroup: state.auth.user.group,
  categories: state.categories

});

export { BooksList };
export default connect(mapStateToProps, {
  getBooks,
  setBooks,
  getBookCategories
})(BooksList);
