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
import SignupForm from './SignupForm';

/**
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
     * Creates an instance of SignupForm.
     * @param {any} props
     * @memberof SignupForm
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
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
    this.onFacebookCallback = this.onFacebookCallback.bind(this);
  }

  /**
   * @returns {void}
   * @param {object} response
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
   * @returns {void}
   * @param {object} response
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
   * @returns {void}
   * @memberof Signup
   */
  onGoogleFailure() {
    this.props.addFlashMessage({
      type: 'error',
      text: 'Oh! Oh! We experienced an error validating you on google. Please try again'
    });
  }

  /**
     * @returns {void}
     * @param {object} event
     * @memberof SignupForm
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
     * @param {any} event
     * @memberof SignupForm
     */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.userSignupRequest(this.state.user).then(
      (data) => {
        document.getElementById('signupForm').reset();

        this.setState({
          isLoading: false,
          user: {}
        });

        this.props.logUserIn(data);
        this.context.router.push('/dashboard');
        this.props.addFlashMessage({
          type: 'success',
          text: data.data
        });
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
   * @returns  {object} JSX
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

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
};

export default connect(null, {
  userSignupRequest: userSignupRequestAction,
  addFlashMessage,
  logUserIn
})(Signup);
