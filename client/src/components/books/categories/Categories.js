import React from 'react';
import CategoriesList from './CategoriesList';

const $ = window.$;

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
        <CategoriesList />
      </div>
    );
  }
}
