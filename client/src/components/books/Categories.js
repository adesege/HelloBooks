import React from 'react';
import $ from 'jquery';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Categories extends React.Component {
  componentDidMount() {
    $('#toggleAdd').click((e) => {
      $('#addCategory').toggleClass('hidden-xl-down');
    });
  }
  render() {
    return (
      <div>
        <div className="toolaction"><button type="button" className="btn btn-success"> <i className="fa fa-plus text-white"></i></button></div><h4 className="title mb-2 mr-4">Book categories</h4>
        <div className="mb-4"><small>View books by category</small></div>
        <form className="form-inline mb-4">
          <select className="form-control custom-select form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select className="form-control form-control-sm custom-select mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <button type="submit" className="btn btn-sm btn-danger">filter</button>
        </form>
        <button type="button" className="btn btn-sm btn-primary mb-3" id="toggleAdd"><i className="fa fa-plus-square-o"></i> Add</button>
        <div className="hidden-xl-down" id="addCategory">
          <form className="mb-4 form-inline">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Name of the category"/>
              <div className="input-group-btn"><button type="button" className="btn btn-success">Add</button></div>
            </div>
          </form>
        </div>
        <div className="table-responsive text-center">
          <table className="table" id="stockTable">
            <thead className="thead-default text-center">
              <tr className="text-center">
                <th>#</th>
                <th>Category name</th>
                <th>Date added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody><tr>
              <td>1</td>
              <td>Category 3</td>
              <td>August 2, 2017</td>
              <td>
                <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
              </td>
            </tr><tr>
              <td>2</td>
              <td>Category 4</td>
              <td>August 3, 2017</td>
              <td>
                <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
              </td>
            </tr><tr>
              <td>3</td>
              <td>Category 5</td>
              <td>August 4, 2017</td>
              <td>
                <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
              </td>
            </tr><tr>
              <td>4</td>
              <td>Category 6</td>
              <td>August 5, 2017</td>
              <td>
                <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
              </td>
            </tr><tr>
              <td>5</td>
              <td>Category 7</td>
              <td>August 6, 2017</td>
              <td>
                <button type="button" className="btn btn-sm btn-info mb-2 mb-sm-0"><i className="fa fa-pencil-square-o"></i></button>
                <button type="button" className="btn btn-sm btn-danger"><i className="fa fa-pencil-square-o"></i></button>
              </td>
            </tr></tbody>
          </table>
        </div>
        <a href="" className="btn btn-primary bg-light btn-sm mb-3">See more</a>
      </div>
    );
  }
}
