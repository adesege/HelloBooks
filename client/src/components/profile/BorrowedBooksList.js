import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from '../form/Button';
import { showCoverPhoto } from '../../utils/';

/**
 * @class BorrowedBooksList
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class BorrowedBooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({
        content: nextProps.content
      });
    }
  }

  render() {
    const emptyMessage = (
      <h1>
        You have not borrowed any book
      </h1>
    );

    return (
      <div className="row pr-3" id="bookList">
        {
          this.state.content
            ? this.state.content.map((object, index) => (
              <div
                className="col-sm-4 col-md-3 col-lg-4 col-xl-2 pr-0 col-6 mb-4 book"
                key={index}>
                <Link
                  to={`/books/view/${object.Book.id}`}
                  className="h-100"
                  style={{ position: 'unset', display: 'block' }}
                >
                  <img
                    className="img-thumbnail"
                    src={ showCoverPhoto(object.Book.coverPhotoPath) }
                    alt={object.Book.title}/>
                </Link>
                <div
                  className="actions ml-3 mb-3"
                  data-bookId={object.Book.id}
                  data-id={object.id}>
                  <Button
                    className="btn-sm btn-default card-link m-0 mr-2"
                    title="Return book"
                    label="Return book"
                    onClick={this.props.onReturnBook} />
                </div>
              </div>
            ))
            : emptyMessage
        }
      </div>
    );
  }
}

BorrowedBooksList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BorrowedBooksList;
