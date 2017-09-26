import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftSidebar from './sidebar/Left';
import { getBooks } from '../../actions/books';
import BooksList from '../books/books/BooksList';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    this.props.getBooksAction();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({ books: nextProps.books });
    }
  }
  render() {
    return (
      <div className="row">
        <LeftSidebar className="col-sm-4 flex-last flex-sm-first mb-5 col-md-5 col-lg-3"/>
        <div className="col-sm-8 col-md-7 col-lg-9"><h4 className="title mb-2 mr-4">Dashboard</h4>
          <div className="mb-4">
            <small>
        Welcome Tayo. Here are some books you may find interesting.
        Use the form below to filter through the list.
            </small>
          </div>
          <form className="form-inline mb-4">
            <div className="form-group">
              <select className="form-control form-control-sm mb-md-2 ml-md-2">
                <option value="">Choose a category</option>
                <option value="">Category 1</option>
                <option value="">Category 2</option>
                <option value="">Category 3</option>
              </select>
            </div>
            <div className="form-group mb-md-2 ml-md-2">
              <input type="text" placeholder="Enter author's name" className="form-control form-control-sm"/>
            </div>
            <div className="form-group mb-md-2 ml-md-2">
              <input type="text" placeholder="Enter Book title" className="form-control form-control-sm"/>
            </div>
            <div className="form-group mb-md-2 ml-md-2">
              <input type="text" placeholder="Enter Book description" className="form-control form-control-sm"/>
            </div>
            <div className="form-group mb-md-2 ml-2">
              <button type="submit" className="btn btn-sm btn-danger">filter</button>
            </div>
          </form>
          <BooksList
            content={this.state.books}
          />
          <button type="button" className="btn btn-primary bg-light btn-block mb-3 mx-0">See more</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, { getBooksAction: getBooks })(Dashboard);
