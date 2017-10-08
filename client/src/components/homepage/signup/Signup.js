import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequestAction } from '../../../actions/signupActions';
import { logUserIn } from '../../../actions/auth';
import { addFlashMessage } from '../../../actions/flashMessages';
import '../../../assets/scss/common.scss';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Signup extends React.Component {
  render() {
    return (
      <div>
        <div className="card-body mx-4">
          <div className="row">
            <div
              className="text-desc text-center col-sm-10 offset-sm-1">
              <p className="mb-3">
                It takes less than 30 seconds to create an account.
                We just need some little details from you.
              </p>
            </div>
          </div>
          <SignupForm
            userSignupRequest = {this.props.userSignupRequest}
            addFlashMessage = {this.props.addFlashMessage}
            logUserIn = {this.props.logUserIn} />
        </div>
        <div className="footer pt-3 pb-4 mdb-color lighten-3">
          <div className="text-center">
            <p
              className="font-small white-text mb-2 pt-3">or Sign up with:
            </p>
          </div>

          <div className="mt-2 text-center">
            <a className="icons-sm">
              <i className="fa fa-facebook white-text fa-lg"> </i>
            </a>
            <a className="icons-sm">
              <i className="fa fa-twitter white-text fa-lg"> </i>
            </a>
            <a className="icons-sm">
              <i className="fa fa-google-plus white-text fa-lg"> </i>
            </a>
          </div>

        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, {
  userSignupRequest: userSignupRequestAction,
  addFlashMessage,
  logUserIn
})(Signup);
