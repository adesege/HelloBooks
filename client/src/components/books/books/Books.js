import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router';
import PropTypes from 'prop-types';
import image from '../../../assets/images/2.jpg';
import Button from '../../form/Button';
import BooksList from './BooksList';
import getBooks from '../../../actions/books';
import BooksModal from './BooksModal';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Books extends React.Component {
  constructor(props) {
    super(props);
    this.goToAddPage = this.goToAddPage.bind(this);
  }

  componentDidMount() {
    this.props.getBooks();
  }

  goToAddPage(event) {
    this.context.router.push('/books/add');
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div className="toolaction">
          <Button
            type="button"
            icon="plus"
            iconClass="text-white"
            className="btn-success p-0"
            id="add-books-btn"
            onClick={this.goToAddPage}
          />
        </div>
        <h4 className="title mb-2 mr-4">Books</h4>
        <div className="mb-4">
          <small>View books</small>
        </div>
        <form className="form-inline mb-4">
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by status...</option>
            <option value="">Active</option>
            <option value="">Pending approval</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <input type="text" className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0" placeholder="by author"/>
          <button type="submit" className="btn btn-sm btn-danger">filter</button>
        </form>
        <BooksList content={this.props.books} />
        <div className="row">
          { [...Array(12)].map((val, index) => (
            <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12 mb-4" key={index}>
              <div className="row">
                <div className="col-sm-6 col-6 align-self-center">
                  <img className="img-thumbnail" src={image} alt="Card cap"/>
                </div>
                <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                  <h6 className="mt-4 mt-sm-0 mb-0"><a href="/books/borrow/index.html">Book title</a></h6>
                  <h6 className="mb-1 text-muted"><small>Author 1</small></h6>
                  <h6 className="mb-1 text-muted"><small>June 1st, 2017</small></h6>
                  <p className="small mb-1"><span className="text-success d-block">Active</span>
                    <span className="text-danger d-block">Pending approval</span></p>
                  <a href="#top" className="card-link"  title="Edit book"><i className="fa fa-pencil"></i></a>
                  <a href="#top" className="card-link text-danger"  title="Delete"><i className="fa fa-remove"></i></a>
                </div> {/* col sm 8 */}
              </div>{/* row */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
Books.proptypes = {
  books: PropTypes.array.isRequired,
  getBooks: PropTypes.func.isRequired
};

Books.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.books
});
export default connect(mapStateToProps, { getBooks })(Books);
