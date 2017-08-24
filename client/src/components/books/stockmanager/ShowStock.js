import React from 'react';
import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import AddStock from '../../../modal/stockmanager/AddStock';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class ShowStock extends React.Component {
  render() {
    return (
      <div>
        <AddStock />
        <div className="toolaction">
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addStockModal" aria-pressed="false">
            <i className="fa fa-plus text-white"></i>
          </button>
        </div>
        <h4 className="title mb-2 mr-4">Viewing a stock</h4>
        <div className="mb-4">
          <small>You can add or edit stock information for this book here.
          Use the filter form to view from a particular page. </small>
        </div>
        <form className="form-inline mb-4">
          <div className="form-group mr-2">
            <select className="custom-select custom-select-sm form-control-sm w-100">
              <option>Filter by date</option>
              <option value="">Today</option>
              <option value="">7 days ago</option>
              <option value="">2 weeks ago</option>
              <option value="">a month ago</option>
              <option value="">a while ago</option>
            </select>
          </div>
          <div className="form-group text-right">
            <button type="button" className="btn btn-sm btn-success">Go!</button>
          </div>
        </form>
        <button type="button" className="btn btn-sm btn-primary mb-3" data-toggle="modal" data-target="#addStockModal">
          <i className="fa fa-plus-square-o"></i> Add
        </button>
        <div className="table-responsive text-center">
          <table className="table" id="stockTable">
            <thead className="thead-default">
              <tr>
                <th>No. of copies</th>
                <th>Record date</th>
                <th>Added on</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { [...Array(10)].map((val, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>July { index + 3 }, 2017</td>
                  <td>August { index + 2 }, 2017</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                    <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-primary btn-sm mb-3">See more</button>
      </div>
    );
  }
}
