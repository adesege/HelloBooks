import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { userSignupRequestAction } from 'actions/signupActions';
import { logUserIn } from 'actions/auth';
import { addFlashMessage } from 'actions/flashMessages';
import 'assets/scss/common.scss';
import passportConfig from 'config/passport';
import validateUser from 'utils/validators/user';
import SignupForm from './SignupForm';

const propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Signup component
 *
 * @class Signup
 *
 * @extends {React.Component}
*/
class Signup extends React.Component {
  /**
   * Creates an instance of Signup.
   *
   * @param {object} props - component props
   *
   * @memberof Signup
  */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        oauthID: ''
      },
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
    this.onFacebookCallback = this.onFacebookCallback.bind(this);
  }

  /**
   * Facebook login success callback to log a user in
   *
   * @returns {undefined}
   *
   * @param {object} response - facebook response object
   *
   * @memberof Signup
  */
  onFacebookCallback(response) {
    this.setState({
      user: {
        name: response.name,
        email: response.email,
        password: response.id,
        confirmPassword: response.id,
        oauthID: response.id
      }
    });
    document.getElementById("signup").click();
  }

  /**
   * Google login success callback to log a user in
   *
   * @returns {undefined}
   *
   * @param {object} response - google response object
   *
   * @memberof Signup
  */
  onGoogleCallback(response) {
    this.setState({
      user: {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        confirmPassword: response.profileObj.googleId,
        oauthID: response.profileObj.googleId
      }
    });
    document.getElementById("signup").click();
  }

  /**
   * Google login failure callback
   *
   * @returns {undefined}
   *
   * @memberof Signup
  */
  onGoogleFailure() {
    this.props.addFlashMessage({
      type: 'error',
      text: [
        'Oh! Oh! We experienced an error ' +
        'validating you on google. Please try again'
      ]
    });
  }

  /**
   * Handle form input onChange event
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
   * @memberof Signup
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
   * Creates a user
   *
   * @returns {undefined}
   *
   * @param {object} event - event handler
   *
   * @memberof Signup
  */
  onSubmit(event) {
    event.preventDefault();

    if (!this.isFormValid()) { return; }

    this.setState({ isLoading: true });
    this.props.userSignupRequest(this.state.user).then((data) => {
      if (data.response && data.response.status >= 400) {
        this.setState({
          isLoading: false
        });
      } else {
        this.context.router.push('/dashboard');
      }
    });
  }

  /**
   * Validation check
   *
   * @returns {boolean} isValid
   *
   * @memberof Signup
  */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'signup');
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * Renders component
   *
   * @returns  {JSX} JSX
   *
   * @memberof Signup
   */
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
            logUserIn = {this.props.logUserIn}
            onSubmit = {this.onSubmit}
            user={this.state.user}
            isLoading={this.state.isLoading}
            onChange={this.onChange}
            validationError={this.state.errors}
          />
        </div>
        <div className="footer pt-3 pb-4 mdb-color lighten-3">
          <div className="text-center">
            <p
              className="font-small white-text mb-2 pt-3">or Sign up with:
            </p>
          </div>

          <div className="mt-2 text-center">
            <GoogleLogin
              clientId={passportConfig.google.clientID}
              onSuccess={this.onGoogleCallback}
              onFailure={this.onGoogleFailure}
              tag="a"
              className="icons-sm text-danger"
              style={{}}
              type=""
            >
              <i className="fa fa-google-plus white-text fa-lg" />
            </GoogleLogin>
            <FacebookLogin
              appId={passportConfig.facebook.clientID}
              autoLoad={false}
              textButton=""
              fields="name,email,picture"
              callback={this.onFacebookCallback}
              tag="a"
              cssClass="icons-sm text-primary signup-facebook-btn"
              style={{}}
              type=""
              icon="fa fa-facebook white-text fa-lg"
            />
          </div>
        </div>
      </div>
    );
  }
}

Signup.contextTypes = contextTypes;

Signup.propTypes = propTypes;

export { Signup };
export default connect(null, {
  userSignupRequest: userSignupRequestAction,
  addFlashMessage,
  logUserIn
})(Signup);
