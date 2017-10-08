import React from 'react';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class LeftSidebar extends React.Component {
  render() {
    return (
      <div className="col-sm-4 flex-first flex-sm-first mb-5 col-md-4 col-lg-3 pr-sm-0">
        <div className="card mb-3">
          <div className="card-header">
            <span>Filter by</span>
          </div>
          <form>
            <div className="card-block">
              <div className="form-group">
                <label className="custom-control align-items-center custom-checkbox">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description small text-danger">Unread</span>
                </label>
                <label className="custom-control align-items-center custom-checkbox">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description small text-success">Read</span>
                </label>
              </div>
              <div className="form-group">
                <label className="custom-control align-items-center custom-checkbox">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description small">Returned</span>
                </label>
                <label className="custom-control align-items-center custom-checkbox">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description small">Borrowed</span>
                </label>
                <label className="custom-control align-items-center custom-checkbox">
                  <input type="checkbox" className="custom-control-input"/>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description small">Surcharged</span>
                </label>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Enter user's name" className="form-control form-control-sm"/>
              </div>
              <div className="form-group">
                <input type="date" placeholder="Choose a date" className="form-control form-control-sm"/>
              </div>
            </div>{/* row */}
            <div className="card-footer">
              <button type="submit" className="btn btn-sm btn-danger">filter</button>
              <button type="reset" className="btn btn-sm btn-warning">reset</button>
            </div>
          </form>
        </div>{/* card */}
      </div>
    );
  }
}
