import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Button from 'form/Button';
import { showCoverPhoto } from 'utils/';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';

const propTypes = {
  content: PropTypes.array.isRequired,
  onReturnBook: PropTypes.func.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Borrowed books list component
 *
 * @class BorrowedBooksList
 *
 * @extends {Component}
*/
class BorrowedBooksList extends Component {
  /**
   * Creates an instance of BorrowedBooksList.
   *
   * @param {object} props - component props
   *
   * @memberof BorrowedBooksList
  */
  constructor(props) {
    super(props);
    this.state = {
      books: ''
    };
  }

  /**
   * Lifecycle method invoked when component will receive props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof BorrowedBooksList
  */
  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({
        content: nextProps.content
      });
    }
  }

  /**
   * Renders component
   *
   * @returns {object} JSX
   *
   * @memberof BorrowedBooksList
  */
  render() {
    return (
      <div>
        {this.state.content && this.state.content.length !== 0 ?
          <div className="row pr-3" id="bookList">
            {this.state.content.map((object, index) => (
              <div
                className="col-sm-4 col-md-3 col-lg-4 col-xl-2 col-6 mb-4 book"
                key={index}>
                <Link
                  to={`/books/view/${object.Book.id}`}
                  className="h-100"
                  style={{ position: 'unset', display: 'block' }}
                >
                  <img
                    className="img-thumbnail"
                    src={showCoverPhoto(object.Book.coverPhotoPath)}
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
            ))}
          </div> :
          <EmptyMessage
            text="You have not borrowed any book"
            absolute={false} />
        }
      </div>
    );
  }
}

BorrowedBooksList.propTypes = propTypes;

BorrowedBooksList.contextTypes = contextTypes;

export default BorrowedBooksList;
