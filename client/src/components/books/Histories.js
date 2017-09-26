import React from 'react';
import logo3 from '../../assets/images/2.jpg';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Histories extends React.Component {
  render() {
    return (
      <div>
        <h4 className="title mb-2 mr-4">My borrowing history</h4>
        <div className="mb-1">
          <small>I can view all my borrowing history here.</small>
        </div>
        <p>Borrowed 5, returned 3</p>
        <form className="form-inline mb-4">
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by date...</option>
            <option value="">Today</option>
            <option value="">Last 7 days</option>
            <option value="">Last 14 days</option>
            <option value="">A month ago</option>
          </select>
          <select className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0">
            <option value="">by name...</option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
          <button type="submit" className="btn btn-sm btn-danger">filter</button>
        </form>
        <div className="row">
          { [...Array(12)].map((val, index) => (
            <div className="col-sm-6 col-md-6 col-lg-4 col-xs-12 mb-4">
              <div className="row">
                <div className="col-sm-6 col-6 align-self-center">
                  <img className="img-thumbnail" src={logo3} alt="Card cap"/>
                </div>
                <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                  <h6 className="mt-4 mt-sm-0 mb-0">
                    <a href="/books/borrow/index.html">Book title</a>
                  </h6>
                  <h6 className="mb-1 text-muted"><small>Author 1</small></h6>
                  <p className="mb-0"><small>June 27th, 2017</small></p>
                  <p className="mb-0 text-danger"><small>3 days since book was borrowed</small></p>
                  <a href="#top" className="card-link d-block" title="Book returned" onclick="$('.showBorrow').toggleClass('hidden-xl-down');" ><small>Returned</small></a>
                  <a href="#top" className="card-link d-block ml-0" title="I'm yet to return this book"><small>Return</small></a>
                  <div className="mt-4 hidden-xl-down showBorrow">
                    <form className="justify-content-center">
                      <label className="sr-only">When will you return this book?</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-calendar"></i></div>
                        <input type="text" className="form-control form-control-sm" placeholder="Return date"/>
                      </div>
                      <div className="form-group mt-1"><button type="button" className="btn btn-block btn-success btn-sm"><i className="fa fa-check"></i></button>
                      </div>
                    </form>
                  </div>{/* }borrow book form */}
                </div>{/* col sm 8 */}
              </div>{/* row */}
            </div>
          )) }
        </div>{/* row */}
        <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
      </div>
    );
  }
}
