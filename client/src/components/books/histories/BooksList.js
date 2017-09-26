import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from 'halogen/ScaleLoader';
import PropTypes from 'prop-types';
import Button from '../../form/Button';
import { showCoverPhoto } from '../../../utils/';

/**
 * @class BooksList
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class BooksList extends Component {
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
      <div
        className="book-list-loader">
        <Loader
          color="#26A65B"/>
      </div>
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
                  to={`/books/view/${object.id}`}
                  className="h-100"
                  style={{ position: 'unset', display: 'block' }}
                >
                  <img
                    className="img-thumbnail"
                    src={ showCoverPhoto(object.coverPhotoPath) }
                    alt={object.title}/>
                </Link>
                <div className="actions ml-3 mb-3">
                  <Button
                    className="btn-sm btn-default card-link m-0 mr-2"
                    title="Add to reading list"
                    icon="bookmark" />
                  {this.props.userGroup === 'admin' && <span><Button
                    to={`/books/edit/${object.id}`}
                    onClick={this.props.goToEditPage.bind(this)}
                    className="btn-sm btn-info card-link m-0 mr-2"
                    icon="pencil" />
                  <Button
                    to={`/books/delete/${object.id}`}
                    onClick={this.props.confirmDelete.bind(this)}
                    className="btn-sm btn-danger card-link m-0 mr-2"
                    icon="remove" />
                  </span>
                  }
                </div>
              </div>
            ))
            : emptyMessage
        }
      </div>
    );
  }
}

BooksList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BooksList;
