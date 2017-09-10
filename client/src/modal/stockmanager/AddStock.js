import React from 'react';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class AddStock extends React.Component {
  render() {
    return (
      <div className="modal fade" data-backdrop="static" id="addStockModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content border-0">
            <div className="modal-body pt-4 border-bottom-0">
              <form>
                <div className="form-group">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">Number of copies</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon"><i className="fa fa-hashtag"></i></div>
                    <input type="number" className="form-control d-block" placeholder="Number of copies"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">Record date</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon"><i className="fa fa-calendar"></i></div>
                    <input type="date" className="form-control d-block" placeholder="Record date"/>
                  </div>
                  <small className="form-text">Record date is different from the date you add the record. </small>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top-0">
              <button type="button" className="btn btn-sm btn-primary">Add</button>
              <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
