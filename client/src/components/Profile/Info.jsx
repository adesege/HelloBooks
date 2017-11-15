import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userImage from 'assets/images/user.png';
import { updateUser } from 'actions/users';
import 'assets/scss/profileInfo.scss';
import ChangePasswordForm from './ChangePasswordForm';

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
      },
      isOpenModal: false,
      isLoading: false
    };
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
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
 * @returns {void}
 * @memberof ProfileInfo
 */
  toggleOpenModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  }

  /**
  *
  * @returns {object} JSX
  * @memberof ProfileInfo
  */
  render() {
    const { user } = this.props;
    return (
      <div className="row" id="profileInfo">
        <div className="col-sm-6 offset-sm-3">
          <div className="card mb-3">
            <div className="row">
              <div
                className=
                  "col-sm-4 text-center align-self-center">
                <img
                  className="card-img-top avatar mt-3"
                  src={userImage}
                  alt={user.name} />
              </div>
              <div className="col-sm-8">
                <div className="card-block">
                  <h6 className="card-title">
                    <i
                      className="fa fa-user text-info" />
                    {user.name}
                  </h6>
                  <div className="card-text">
                    <span className="d-block mb-2">
                      <i className= "fa fa-envelope text-info" />
                      {user.email}
                    </span>
                    <span className="d-block mb-2">
                      <i className="fa fa-calendar-check-o text-info" />
                      {user.createdAt}
                    </span>
                  </div>
                  <a
                    href="#"
                    onClick={this.toggleOpenModal}
                    className="card-link changePassword"
                    title="Change your password">
                    <i className="fa fa-key" />
                    Change password
                  </a>

                  <ChangePasswordForm
                    onChangePasswordInput={this.onChangePasswordInput}
                    onChangePassword={this.onChangePassword}
                    isOpenModal={this.state.isOpenModal}
                    toggleOpenModal={this.toggleOpenModal}
                    onClickSubmit={this.onClickSubmit}
                    isLoading={this.state.isLoading}
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
