import React, { Component } from 'react';
import Loader from 'halogen/ScaleLoader';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router';
import Button from '../../form/Button';
import { showCoverPhoto } from '../../../utils/';

/**
 * @class List
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class List extends Component {
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
                className="col-sm-4 col-md-4 col-lg-4 col-xs-12 mb-4"
                key={index}>
                <div className="row">
                  <div className="col-sm-6 col-6 align-self-center">
                    <img
                      className="img-thumbnail"
                      src={ showCoverPhoto(object.Book.coverPhotoPath) }
                      alt={object.Book.title}/>
                  </div>
                  <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                    <h6 className="mt-4 mt-sm-0 mb-0">
                      <Link
                        to={`/books/view/${object.Book.id}`}
                      >
                        {object.Book.title}</Link>
                    </h6>
                    <h6 className="mb-1 text-muted">
                      <small>{object.Book.author}</small>
                    </h6>
                    <p className="mb-0">
                      <small>
                        <Timestamp time={object.Book.updatedAt} format='ago' precision={1} />
                      </small>
                    </p>
                    {object.isReturned ? (<small>Returned</small>) : (<small>Yet to return</small>)}
                  </div>{/* col sm 8 */}
                </div>{/* row */}
              </div>
            ))
            : emptyMessage
        }
      </div>
    );
  }
}

List.contextTypes = {
  router: PropTypes.object.isRequired
};

export default List;
