import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { login, setCurrentUser, logUserIn } from 'actions/auth';
import { addFlashMessage } from 'actions/flashMessages';
import passportConfig from 'config/passport';
import validateUser from 'utils/validators/user';
import LoginForm from './LoginForm';

const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * Login component
 *
 * @class Login
 *
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
   *
   * Creates an instance of LoginForm.
   *
   * @param {object} props
   *
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        oauthID: ''
      },
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
    this.onFacebookCallback = this.onFacebookCallback.bind(this);
    this.onGoogleFailure = this.onGoogleFailure.bind(this);
  }

  /**
   * Facebook login success callback to log a user in
   *
   * @returns {undefined}
   *
   * @param {object} response
   *
   * @memberof Login
   */
  onFacebookCallback(response) {
    if (response && response.email) {
      this.setState({
        user: {
          email: response.email,
          password: `${Math.random()}`,
          oauthID: response.id
        }
      });
      document.getElementById("login").click();
    } else {
      this.props.addFlashMessage({
        type: 'error',
        text: [
          'We experienced an error validating you on facebook. Please try again'
        ]
      });
    }
  }

  /**
   * Google login success callback to log a user in
   *
   * @returns {undefined}
   *
   * @param {object} response
   *
   * @memberof Login
   */
  onGoogleCallback(response) {
    this.setState({
      user: {
        email: response.profileObj.email,
        password: `${Math.random()}`,
        oauthID: response.profileObj.googleId
      }
    });
    document.getElementById("login").click();
  }

  /**
   * Google login failure callback
   *
   * @returns {undefined}
   *
   * @param {object} response
   *
   * @memberof Login
  */
  onGoogleFailure(response) {
    if (response &&
      (response.error === 'popup_closed_by_user' ||
       response.error === 'access_denied')) {
      this.props.addFlashMessage({
        type: 'error',
        text: [
          'We experienced an error validating you on google. Please try again'
        ]
      });
    }
  }

  /**
   * Handle form input onChange event
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Login
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
   * Log a user in
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof Login
  */
  onSubmit(event) {
    event.preventDefault();

    if (!this.isFormValid()) { return; }

    this.setState({ isLoading: true });
    this.props.login(this.state.user)
      .then((data) => {
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
   * @memberof Login
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'login');
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }


  /**
   * Renders component
   *
   * @returns  {object} JSX
   *
   * @memberof Login
   */
  render() {
    return (
      <div>
        <div className="card-body mx-4">
          <LoginForm
            login = {this.props.login}
            addFlashMessage = {this.props.addFlashMessage}
            setCurrentUser = {this.props.setCurrentUser}
            logUserIn = {this.props.logUserIn}
            isLoading={this.state.isLoading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            user={this.state.user}
            validationError={this.state.errors}
          />
          <p
            className=
              "font-small dark-grey-text text-right \
                    d-flex justify-content-center mb-3 pt-2">
           or Sign in with:
          </p>

          <div className="row my-3 d-flex justify-content-center">
            <GoogleLogin
              autoLoad={false}
              clientId={passportConfig.google.clientID}
              onSuccess={this.onGoogleCallback}
              onFailure={this.onGoogleFailure}
              tag="button"
              className="btn btn-danger mr-md-3 btn-sm"
              type="button"
            >
              <i className="fa fa-google-plus text-white text-center" />
            </GoogleLogin>
            <FacebookLogin
              appId={passportConfig.facebook.clientID}
              autoLoad={false}
              textButton=""
              fields="name,email,picture"
              callback={this.onFacebookCallback}
              tag="button"
              cssClass="btn btn-primary mr-md-3 btn-sm"
              type="button"
              icon="fa fa-facebook text-white text-center"
            />
          </div>
        </div>

        <div
          className="modal-footer mx-sm-5 mx-3 pt-3 mb-1">
          <p
            className="font-small grey-text d-flex justify-content-end">
          Not a member?
            <Link
              to="/signup"
              className="blue-text ml-1">
          Create an account
            </Link>
          </p>
        </div>

      </div>
    );
  }
}

Login.contextTypes = contextTypes;

Login.propTypes = propTypes;

/**
 * Map dispatch to props
 *
 * @param {object} dispatch
 *
 * @returns {object} map dispatch to props
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  addFlashMessage,
  setCurrentUser,
  logUserIn
}, dispatch);

/**
 * Get state from store
 *
 * @param {object} state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export { Login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
