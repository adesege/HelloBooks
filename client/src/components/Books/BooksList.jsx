import React, { Component } from 'react';
import { Link } from 'react-router';
import { ScaleLoader as Loader } from 'halogen';
import PropTypes from 'prop-types';
import { showCoverPhoto } from 'utils';

/**
 * @class BooksList
 * @extends {Component}
 */
class BooksList extends Component {
  /**
     * Creates an instance of BooksList.
     * @param {any} props
     * @memberof BooksList
     */
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  /**
     * @returns {void}
     * @param {any} nextProps
     * @memberof BooksList
     */
  componentWillReceiveProps(nextProps) {
    if (this.props.books !== nextProps.books) {
      this.setState({
        books: nextProps.books
      });
    }
  }

  /**
     * @returns {object} JSX
     * @memberof BooksList
     */
  render() {
    const emptyMessage = (
      <div
        className="book-list-loader">
        <Loader
          color="#26A65B"/>
      </div>
    );

    return (
      <div className="row pr-3" id="bookList">
        {
          this.state.books ?
            this.state.books.map((object, index) => (
              <div
                className="col-sm-4 col-md-3 col-lg-4 col-xl-2 pr-0 col-6 mb-4 book"
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
                    <i className="btn btn-sm btn-info card-link m-0 mr-2 fa fa-pencil"
                      onClick={this.props.goToEditPage.bind(this)}
                      id={object.id}
                    />
                    <i className="btn btn-sm btn-danger card-link m-0 mr-2 fa fa-remove"
                      onClick={this.props.confirmDelete.bind(this)}
                      id={object.id}
                    />
                  </span>
                  }
                </div>
              </div>
            )) :
            emptyMessage
        }
      </div>
    );
  }
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  userGroup: PropTypes.string,
  goToEditPage: PropTypes.func,
  confirmDelete: PropTypes.func
};
BooksList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BooksList;
