import React from 'react';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Settings extends React.Component {
  render() {
    return (
      <div className="row pr-3 pl-3 px-sm-0" id="Settings">
        <div className="col-sm-8 offset-sm-2 mt-4 px-0 pr-sm-3">
          <form>
            <div id="accordion" role="tablist" aria-multiselectable="true">
              <div className="card">
                <div className="card-header" role="tab" id="headingOne">
                  <h5 className="mb-0">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Basic Settings</a>
                  </h5>
                </div>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                  <div className="card-block">
                    <div className="form-group">
                      <input type="text" placeholder="Application email address" className="form-control"/>
                      <p className="form-text">This will be used to send emails to the user</p>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Application Name" className="form-control"/>
                      <p className="form-text">This will be used as the email sender's name</p>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Number of days until surcharge" className="form-control"/>
                      <p className="form-text">How long can a user hold unto a book before being charged?</p>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-success" type="button">Submit</button>
                      <button className="btn btn-danger" type="reset">Reset</button>
                    </div>
                  </div>
                </div>
              </div>{/* card */}
            </div>{/* accordion */}
          </form>
        </div>
      </div>
    );
  }
}
