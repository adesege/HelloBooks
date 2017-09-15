import React from 'react';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class CategoriesList extends React.Component {
  componentDidMount() {
    $('#toggleAdd').click((e) => {
      $('#addCategory').toggleClass('hidden-xl-down');
    });
  }
  render() {
    return (
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
          </tr>
          </tbody>
        </table>
        <a href="" className="btn btn-primary bg-light btn-sm mb-3">See more</a>
      </div>
    );
  }
}

export default CategoriesList;
