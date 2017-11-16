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

/**
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
   * Creates an instance of LoginForm.
   * @param {object} props
   * @memberof LoginForm
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
   * @returns {void}
   * @param {object} response
   * @memberof Signup
   */
  onFacebookCallback(response) {
    this.setState({
      user: {
        email: response.email,
        password: `${Math.random()}`,
        oauthID: response.id
      }
    });
    document.getElementById("login").click();
  }

  /**
   * @returns {void}
   * @param {object} response
   * @memberof Signup
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
 * @returns {void}
 * @param {object} response
 * @memberof Login
 */
  onGoogleFailure(response) {
    if (response && (response.error === 'popup_closed_by_user' || response.error === 'access_denied')) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Oh! Oh! We experienced an error validating you on google. Please try again'
      });
    }
  }

  /**
   * @returns {void}
   * @param {object} event
   * @memberof LoginForm
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
   * @returns {void}
   * @param {object} event
   * @memberof LoginForm
   */
  onSubmit(event) {
    event.preventDefault();

    if (!this.isFormValid()) { return; }

    this.setState({ isLoading: true });
    this.props.login(this.state.user).then(
      (data) => {
        this.setState({
          isLoading: false
        });
        this.props.logUserIn(data);
        this.context.router.push('/dashboard');
      },
      (errors) => {
        this.setState({
          isLoading: false
        });
        if (errors.response) {
          this.props.addFlashMessage({
            type: 'error',
            text: errors.response.data
          });
        }
      }
    );
  }

  /**
   * @returns {boolean} isValid
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
   * @returns  {object} JSX
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

Login.contextTypes = {
  router: PropTypes.object.isRequired
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  addFlashMessage,
  setCurrentUser,
  logUserIn
}, dispatch);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
