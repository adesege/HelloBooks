import React from 'react';
import $ from 'jquery';
import user from '../../../assets/images/user.png';
import image from '../../../assets/images/1.jpg';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class LeftSidebar extends React.Component {
  componentDidMount() {
    $('.editProfile').click((e) => {
      $('#editProfile').toggleClass('hidden-xl-down');
    });
    $('.changePassword').click((e) => {
      $('#changePassword').toggleClass('hidden-xl-down');
    });
  }
  render() {
    return (
      <div className="col-sm-4 px-0 pr-sm-auto pr-sm-3">
        <div className="card mb-3">
          <div className="text-center">
            <img className="card-img-top avatar mt-3" src={user} alt="Card cap"/>
          </div>
          <div className="card-block">
            <h6 className="card-title">
              <i className="fa fa-user text-info"></i> Fadojutimi Temitayo
            </h6>
            <div className="card-text">
              <span className="d-block">
                <i className="fa fa-envelope text-info"></i> My email address
              </span>
              <span className="d-block">
                <i className="fa fa-calendar-check-o text-info"></i> Jan. 12, 2011
              </span>
              <span className="d-block">
                <i className="fa fa-book text-primary"></i> Read
                <strong>5</strong> books. Borrowed 3 books. Returned 1 book
              </span>
              <span className="d-block">
                <i className="fa fa-trophy text-danger"></i>
                <div className="userbar" style={{ backgroundColor: '#7785A0' }}>Novice</div>
                <div className="userbar" style={{ backgroundColor: '#616161' }}>Amateur</div>
                <div className="userbar" style={{ backgroundColor: '#712828' }}>Senior</div>
                <div className="userbar" style={{ backgroundColor: '#507051' }}>Enthusiast</div>
                <div className="userbar" style={{ backgroundColor: '#00a7b6' }}>Expert</div>
                <div className="userbar" style={{ backgroundColor: '#004d94' }}>Leader</div>
                <div className="userbar" style={{ backgroundColor: '#7700af' }}>Veteran</div>
                <div className="userbar" style={{ backgroundColor: '#b52ac5' }}>Master</div>
              </span>
            </div>
            <a href="#top" className="card-link editProfile" data-toggle="tooltip" title="Edit">
              <i className="fa fa-pencil-square"></i> Edit &nbsp;
            </a>
            <div id="editProfile" className="mt-4 hidden-xl-down">
              <form action="/login" method="post">
                <div className="form-group">
                  <label className="sr-only">Name</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon form-control-sm bg-danger text-white" data-toggle="tooltip" title="Please input your name">
                      <i className="fa fa-user"></i>
                    </div>
                    <input type="text" className="form-control form-control-sm" placeholder="Your name" required/>
                  </div>
                </div> {/* form-group */}
                <div className="form-group">
                  <label className="sr-only">Email address</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon form-control-sm bg-info text-white" data-toggle="tooltip" title="Please input your email address"><i className="fa fa-envelope"></i></div>
                    <input type="email" className="form-control form-control-sm" placeholder="Email address"/>
                  </div>
                </div>{/* form-group */}
                <div className="form-group text-center">
                  <button type="button" className="btn btn-sm btn-success btn-block" name="button">Edit my profile</button>
                </div>
              </form>
            </div> {/* editProfile */}
            <a href="#top" className="card-link changePassword" data-toggle="tooltip" title="Change your password"><i className="fa fa-key"></i> Change password</a>
            <div id="changePassword" className="mt-4 hidden-xl-down">
              <form action="/login" method="post">
                <div className="form-group">
                  <label className="sr-only">Current password</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon form-control-sm bg-danger text-white"><i className="fa fa-key"></i></div>
                    <input type="password" className="form-control form-control-sm" placeholder="Current password"/>
                  </div>
                </div>{/* form-group */}
                <div className="form-group">
                  <label className="sr-only">New password</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon form-control-sm bg-info text-white"><i className="fa fa-keyboard-o"></i></div>
                    <input type="password" className="form-control form-control-sm" placeholder="New password"/>
                  </div>
                </div>{/* form-group */}
                <div className="form-group">
                  <label className="sr-only">New password again</label>
                  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div className="input-group-addon form-control-sm bg-info text-white"><i className="fa fa-keyboard-o"></i></div>
                    <input type="password" className="form-control form-control-sm" placeholder="New password again"/>
                  </div>
                </div>{/* form-group */}
                <div className="form-group text-center">
                  <button type="button" className="btn btn-sm btn-success btn-block" name="button">Change password</button>
                </div>
              </form>
            </div>
          </div>
        </div>{/* card */}
        <div className="card mb-3">
          <div className="card-header">
            <span>Reading list</span>
          </div>
          <div className="row m-2">
            { [...Array(4)].map((val, index) => (
              <div className="col-sm-6 col-6 px-0 pr-1 mb-1" key={index}>
                <a href="/books/borrow/index.html">
                  <img className="img-thumbnail w-100 h-100" src={image} alt="Card cap"/>
                </a>
              </div>
            ))}
            <button type="button" className="btn btn-primary bg-light btn-block">See more</button>
          </div>{/* card block */}
        </div>{/* card */}
      </div>
    );
  }
}
