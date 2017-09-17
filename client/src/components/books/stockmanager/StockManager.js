import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import image from '../../../assets/images/3.jpg';
import SearchStock from './SearchStock';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class StockManager extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title mb-2 mr-4">Stock Manager</h4>
        <div className="mb-4"><small>Manage stock here</small></div>

        <SearchStock />

        <h6 className="title my-5"><small>Showing 8 of 10 results</small></h6>
        <div className="row">
          { [...Array(10)].map((val, index) => (
            <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12 mb-4" key={index}>
              <div className="row">
                <div className="col-sm-6 col-6 align-self-center">
                  <img className="img-thumbnail" src={image} alt="Card cap"/>
                </div>
                <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                  <h6 className="mt-4 mt-sm-0 mb-0">
                    <Link to="/books/stock-manager/show">Book title</Link>
                  </h6>
                  <h6 className="mb-1 text-muted"><small>Author 1</small></h6>
                  <h6 className="mb-1 text-muted"><small>June 1st, 2017</small></h6>
                  <Link to="/books/stock-manager/show" className="card-link" title="Edit book">
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <a href="#top" className="card-link text-danger" title="Delete">
                    <i className="fa fa-remove"></i>
                  </a>
                </div>{/* col sm 8 */}
              </div>{/*  row */}
            </div>
          ))}
        </div>{/* row */}
        <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
      </div>
    );
  }
}

export default connect(null, {})(StockManager);
