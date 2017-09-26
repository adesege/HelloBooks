import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userImage from '../../assets/images/user.png';
import ChangePasswordForm from './ChangePasswordForm';
import { updateUser } from '../../actions/users';

/**
 * @class ProfileInfo
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChange: {
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        userId: props.userId ? props.userId : ''
      }
    };
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangePasswordInput(event) {
    this.setState({
      passwordChange: {
        ...this.state.passwordChange,
        [event.target.name]: event.target.value
      }
    });
  }

  onChangePassword(event) {
    event.preventDefault();
    this.props.updateUserAction(this.state.passwordChange);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <div className="card mb-3">
            <div className="row">
              <div className="col-sm-3 pr-0 text-center align-self-center">
                <img className="card-img-top avatar mt-3" src={userImage} alt="Card cap"/>
              </div>
              <div className="pl-sm-0 col-sm-9">
                <div className="card-block">
                  <h6 className="card-title">
                    <i className="fa fa-user text-info"></i> {user.name}
                  </h6>
                  <div className="card-text">
                    <span className="d-block">
                      <i className="fa fa-envelope text-info"></i> {user.email}
                    </span>
                    <span className="d-block">
                      <i className="fa fa-calendar-check-o text-info"></i> {user.createdAt}
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
                  <a href="#top" className="card-link editProfile" title="Edit">
                    <i className="fa fa-pencil-square"></i> Edit &nbsp;
                  </a>
                  <div id="editProfile" className="mt-4 hidden-xl-down">
                    <form action="/login" method="post">
                      <div className="form-group">
                        <label className="sr-only">Name</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon form-control-sm bg-danger text-white" title="Please input your name">
                            <i className="fa fa-user"></i>
                          </div>
                          <input type="text" className="form-control form-control-sm" placeholder="Your name" required/>
                        </div>
                      </div> {/* form-group */}
                      <div className="form-group">
                        <label className="sr-only">Email address</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon form-control-sm bg-info text-white" title="Please input your email address"><i className="fa fa-envelope"></i></div>
                          <input type="email" className="form-control form-control-sm" placeholder="Email address"/>
                        </div>
                      </div>{/* form-group */}
                      <div className="form-group text-center">
                        <button type="button" className="btn btn-sm btn-success btn-block" name="button">Edit my profile</button>
                      </div>
                    </form>
                  </div> {/* editProfile */}
                  <a
                    href="#top"
                    className="card-link changePassword"
                    title="Change your password">
                    <i className="fa fa-key"></i>
                  Change password
                  </a>

                  <ChangePasswordForm
                    onChangePasswordInput={this.onChangePasswordInput}
                    onChangePassword={this.onChangePassword}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ProfileInfo.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.userId
});

export default connect(mapStateToProps,
  { updateUserAction: updateUser })(ProfileInfo);
