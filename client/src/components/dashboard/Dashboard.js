import React from 'react';
import { Link } from 'react-router';
import LeftSidebar from './sidebar/Left';
import logo1 from '../../assets/images/0.jpg';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default () => (
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
      <div className="row pr-3" id="bookList">
        { [...Array(12)].map((val, index) => (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 pr-0 col-6 mb-4 book" key={index + 2}>
            <Link to="/books/view" className="h-100" style={{ position: 'unset' }}><img className="img-thumbnail" src={ logo1 } alt="Card cap" key={index + 3}/></Link>
            <a href="#top" className="card-link"  title="Add to reading list" key={index + 4}>
              <i className="fa fa-bookmark"></i>
            </a>
          </div>
        )) }
      </div> { /* row */ }
      <button type="button" className="btn btn-primary bg-light btn-block mb-3 mx-0">See more</button>
    </div>
  </div>
);
