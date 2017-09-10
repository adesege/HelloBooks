import React from 'react';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class DashboardLayout extends React.Component {
  render() {
    return (
      <div>
        <div className="modal fade" data-backdrop="static" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content border-0">
              <div className="modal-body pt-4 border-bottom-0">
                <form>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div className="input-group-addon"><i className="fa fa-search"></i></div>
                      <input type="text" className="form-control d-block" placeholder="Search text"/>
                    </div>
                    <small className="form-text">You can search a book by author or category. You can also search for other users, etc</small>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top-0">
                <button type="button" className="btn btn-sm btn-primary">Search</button>
                <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
