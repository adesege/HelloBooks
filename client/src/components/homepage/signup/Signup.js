import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from './SignupForm';
import { userSignupRequestAction } from '../../../actions/signupActions';
import { addFlashMessage } from '../../../actions/flashMessages';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Signup extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="text-desc text-center col-sm-10 offset-sm-1">
            <p className="mb-3">It takes less than 30 seconds to create an account. We just need some little details from you.</p>
          </div>
        </div>
        <SignupForm
          userSignupRequest = {this.props.userSignupRequest}
          addFlashMessage = {this.props.addFlashMessage}/>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-sm-6">
            <Link to="/">I already have an account</Link>
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

export default connect(null, { userSignupRequest: userSignupRequestAction, addFlashMessage
})(Signup);
