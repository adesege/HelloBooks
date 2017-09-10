import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import image from '../../../assets/images/3.jpg';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class StockManager extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title mb-2 mr-4">Stock Manager</h4>
        <div className="mb-4"><small>Manage stock here</small></div>
        <div className="row" id="stockManager">
          <div className="col-sm-6 offset-sm-3">
            <div id="stockFilterForm" className="bg-faded pt-3">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Search by author" className="form-control"/>
                </div>
                <p className="text-center hidden-xs-down"><small>-- OR --</small></p>
                <div className="form-group">
                  <select className="custom-select w-100">
                    <option>Filter by category</option>
                    <option value="">Category 1</option>
                    <option value="">Category 2</option>
                    <option value="">Category 3</option>
                    <option value="">Category 4</option>
                    <option value="">Category 5</option>
                    <option value="">Category 6</option>
                  </select>
                </div>
                <p className="text-center hidden-xs-down"><small>-- OR --</small></p>
                <div className="form-group">
                  <select className="custom-select w-100">
                    <option>Filter by date</option>
                    <option value="">Today</option>
                    <option value="">7 days ago</option>
                    <option value="">2 weeks ago</option>
                    <option value="">a month ago</option>
                    <option value="">a while ago</option>
                  </select>
                </div>
                <div className="form-group text-right">
                  <button type="button" className="btn btn-success btn-sm">Go!</button>
                  <button type="reset" className="btn btn-danger btn-sm">Reset</button>
                </div>
              </form>
            </div>{/* Stock filter form */}
          </div>
        </div>{/* row */}
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
                  <Link to="/books/stock-manager/show" className="card-link"  title="Edit book">
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <a href="#top" className="card-link text-danger"  title="Delete">
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
