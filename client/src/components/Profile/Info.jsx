import React from 'react';
import PropTypes from 'prop-types';
import userImage from 'assets/images/user.png';
import 'assets/scss/profileInfo.scss';
import ChangePasswordForm from './ChangePasswordForm';

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  user: PropTypes.object.isRequired,
  onChangePasswordInput: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  passwordChange: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  serverErrors: PropTypes.array.isRequired,
};

const Info = ({
  user,
  onChangePasswordInput,
  onChangePassword,
  isOpenModal,
  toggleOpenModal,
  isLoading,
  passwordChange,
  errors,
  serverErrors
}) => (
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
              </div>
              <a
                href="#"
                onClick={toggleOpenModal}
                className="card-link changePassword"
                title="Change your password">
                <i className="fa fa-key" />
                    Change password
              </a>

              <ChangePasswordForm
                passwordChange={passwordChange}
                onChangePasswordInput={onChangePasswordInput}
                onChangePassword={onChangePassword}
                isOpenModal={isOpenModal}
                toggleOpenModal={toggleOpenModal}
                isLoading={isLoading}
                errors={errors}
                serverErrors={serverErrors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Info.contextTypes = contextTypes;

Info.propTypes = propTypes;

export default Info;
