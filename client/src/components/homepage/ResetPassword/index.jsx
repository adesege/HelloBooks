import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from 'actions/flashMessages';
import { sendResetPasswordMail } from 'actions/auth';
import validateUser from 'utils/validators/user';
import ResetPasswordForm from './ResetPasswordForm';

const propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  resetPasswordAction: PropTypes.func.isRequired,
};

/**
 * Reset password component
 *
 * @class ResetPassword
 *
 * @extends {React.Component}
*/
class ResetPassword extends React.Component {
  /**
   * Creates an instance of ResetPassword.
   *
   * @param {object} props
   *
   * @memberof ResetPassword
  */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
      },
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input onChange event
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ResetPassword
  */
  onChange(event) {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
   * Validation check
   *
   * @returns {boolean} isFormValid
   *
   * @memberof BooksModal
  */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Send reset password mail
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ResetPassword
  */
  onSubmit(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }
    this.setState({ isLoading: true });
    this.props.resetPasswordAction(this.state.user).then(
      (data) => {
        this.setState({
          isLoading: false
        });
      },
      (errors) => {
        this.setState({
          isLoading: false
        });
      }
    );
  }

  /**
   * Renders component
   *
   * @returns {JSX} JSX
   *
   * @memberof ResetPassword
  */
  render() {
    return (
      <div>
        <div className="row">
          <div className="text-desc text-center col-sm-10 offset-sm-1">
            <p className="mb-3">
                  Having trouble signing in to your account?
                  Provide the email address you used to register
                  and we will send you a password reset link
            </p>
          </div>
        </div>{ /* row */ }
        <div className="card-body mx-4">
          <ResetPasswordForm
            isLoading={this.state.isLoading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            user={this.state.user}
            errors={this.state.errors}
          />
        </div>

        <div
          className=
            "modal-footer mx-sm-4 mx-3 \
            mb-1 mt-3 d-block text-right px-0">
          <p className="font-small grey-text">
            <Link to="/signup">I don't have an account</Link>
          </p>
          <p className="font-small grey-text">
            <Link to="/">I remember my password</Link>
          </p>
        </div>

      </div>
    );
  }
}

ResetPassword.propTypes = propTypes;

export { ResetPassword };
export default connect(null, {
  addFlashMessage,
  resetPasswordAction: sendResetPasswordMail
})(ResetPassword);
