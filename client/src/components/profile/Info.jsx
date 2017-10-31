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
class ProfileInfo extends Component {
  /**
   * Creates an instance of ProfileInfo.
   * @param {object} props
   * @memberof ProfileInfo
   */
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


  /**
   * @returns {void}
   * @param {object} event
   * @memberof ProfileInfo
   */
  onChangePasswordInput(event) {
    this.setState({
      passwordChange: {
        ...this.state.passwordChange,
        [event.target.name]: event.target.value
      }
    });
  }


  /**
   * @returns {void}
   * @param {object} event
   * @memberof ProfileInfo
   */
  onChangePassword(event) {
    event.preventDefault();
    this.props.updateUserAction(this.state.passwordChange);
  }


  /**
   *
   * @returns {object} JSX
   * @memberof ProfileInfo
   */
  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2">
          <div className="card mb-3">
            <div className="row">
              <div
                className=
                  "col-sm-3 pr-0 text-center \
                                    align-self-center">
                <img
                  className="card-img-top avatar mt-3"
                  src={userImage}
                  alt={user.name} />
              </div>
              <div className="pl-sm-0 col-sm-9">
                <div className="card-block">
                  <h6 className="card-title">
                    <i
                      className="fa fa-user text-info" />
                    {user.name}
                  </h6>
                  <div className="card-text">
                    <span className="d-block">
                      <i
                        className=
                          "fa fa-envelope text-info"
                      />
                      {user.email}
                    </span>
                    <span className="d-block">
                      <i
                        className=
                          "fa fa-calendar-check-o text-info"
                      />
                      {user.createdAt}
                    </span>
                    <span className="d-block">
                      <i
                        className=
                          "fa fa-book text-primary"
                      />
                                            Read
                      <strong>5</strong>
                                            books.
                                            Borrowed 3 books.
                                            Returned 1 book
                    </span>
                    <span className="d-block">
                      <i
                        className="fa fa-trophy text-danger"
                      />
                      <div
                        className="userbar rank-novice">
                                            Novice</div>
                      <div
                        className="userbar rank-amateur">
                                            Amateur</div>
                      <div
                        className="userbar rank-senior">
                                            Senior</div>
                      <div
                        className="userbar rank-enthusiast">
                                            Enthusiast</div>
                      <div
                        className="userbar rank-expert">
                                            Expert</div>
                      <div
                        className="userbar rank-leader">
                                            Leader</div>
                      <div
                        className="userbar rank-veteran">
                                            Veteran</div>
                      <div
                        className="userbar rank-master">
                                            Master</div>
                    </span>
                  </div>
                  <a
                    href="#top"
                    className="card-link editProfile"
                    title="Edit">
                    <i
                      className="fa fa-pencil-square" />
                                        Edit &nbsp;
                  </a>
                  <div
                    id="editProfile"
                    className="mt-4 hidden-xl-down">
                    <form action="/login" method="post">
                      <div
                        className="form-group">
                        <label
                          className="sr-only">
                                                Name
                        </label>
                        <div
                          className=
                            "input-group mb-2 \
                                                        mr-sm-2 mb-sm-0">
                          <div
                            className=
                              "input-group-addon \
                                                            form-control-sm \
                                                             bg-danger \
                                                             text-white"
                            title=
                              "Please input \
                                                             your name">
                            <i
                              className="fa fa-user" />
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Your name"
                            required/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="sr-only">Email address</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div
                            className="input-group-addon form-control-sm bg-info text-white"
                            title="Please input your email address">
                            <i className="fa fa-envelope" />
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            placeholder="Email address"/>
                        </div>
                      </div>
                      <div className="form-group text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-success btn-block"
                          name="button">Edit my profile
                        </button>
                      </div>
                    </form>
                  </div>
                  <a
                    href="#top"
                    className="card-link changePassword"
                    title="Change your password">
                    <i className="fa fa-key" />
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

ProfileInfo.propTypes = {
  userId: PropTypes.number.isRequired,
  updateUserAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.userId
});

export default connect(
  mapStateToProps,
  { updateUserAction: updateUser }
)(ProfileInfo);
