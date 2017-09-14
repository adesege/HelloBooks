import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLeftSidebar from '../../dashboard/sidebar/Left';
import RelatedBooks from './RelatedBooks';
import BookComment from './BookComment';
import { getBook } from '../../../actions/books';
import BorrowBookModal from './BorrowBookModal';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class ViewBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book ? this.props.book : ''
    };

    this.showBorrowModal = this.showBorrowModal.bind(this);
  }

  showBorrowModal(event) {
    event.preventDefault();
    $(document).ready(() => {
      const $modal = $('#borrow-book');
      $modal.modal('show');
    });
  }
  componentDidMount = () => {
    $('#borrow-book').on('hide.bs.modal', (e) => {
      this.context.router.push('/books');
    });

    this.props.getBook({ id: this.props.params.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book) {
      this.setState({ book: nextProps.book });
    }
    console.log(nextProps);
  }
  render() {
    const { title, author, coverPhotoPath, description, publishedDate, ISBN } = this.state.book;
    return (
      <div className="row" id="borrowBook">
        <BorrowBookModal />
        <div className="col-sm-8">
          <div className="row" id="book-details">
            <div className="col-sm-4">
              <img className="img-thumbnails cover" src={coverPhotoPath} alt="Card cap"/>
              <div className="btn-group btn-group-sm w-100 my-2" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-primary btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> I want to... </button>
                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a className="dropdown-item" href="#top">read</a>
                  <a className="dropdown-item" onClick={this.showBorrowModal} href={''}>borrow</a>
                </div>
              </div>
            </div>
            <div className="col-sm-8 mt-3 mt-sm-0">
              <div className="details">
                <h4 className="card-title font-weight-bold">{title}</h4>
                <h6 className="card-subtitle">
              by {author}
                  <div className="rating d-inline">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                  </div>
                </h6>
                <p className="mt-3">{description}</p>
                <hr/>
                <small className="mt-1 d-block">
                  <em className="d-block">Published date: {publishedDate}</em>
                  <em className="d-block">ISSBN: {ISBN}</em>
                  <em className="d-block">Category: Category 1</em>
                </small>
              </div>
            </div>
          </div>

          <RelatedBooks />
          <BookComment />
        </div>

        <DashboardLeftSidebar className="col-sm-4"/>

      </div>
    );
  }
}

ViewBooks.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});
export default connect(mapStateToProps, { getBook })(ViewBooks);
