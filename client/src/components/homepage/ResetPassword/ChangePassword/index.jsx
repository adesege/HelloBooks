import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from 'actions/flashMessages';
import { resetPassword } from 'actions/auth';
import validateUser from 'utils/validators/user';
import { extractURLQuery } from 'utils/index';
import FlashMessagesList from 'components/FlashMessagesList';
import ChangePasswordForm from './ChangePasswordForm';

const propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  resetPasswordAction: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * @class ChangePassword
 * @extends {React.Component}
 */
class ChangePassword extends React.Component {
  /**
     * Creates an instance of ChangePassword.
     * @param {object} props
     * @memberof ChangePassword
     */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
        validationKey: ''
      },
      isLoading: false,
      errors: {},
      showChangePasswordForm: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @returns {void}
 * @memberof ChangePassword
 */
  componentDidMount() {
    const { validationKey } = this.props.params;
    const email = extractURLQuery(window.location.href).get('email');

    if (!validationKey || !email) {
      return this.props.addFlashMessage({
        type: 'error',
        text: 'There was an error completing your request. Perhaps, you followed a broken link.'
      });
    }
    this.setState({
      showChangePasswordForm: true,
      user: {
        ...this.state.user,
        email,
        validationKey
      }
    });
  }

  /**
       * @returns {void}
       * @param {object} event
       * @memberof ChangePassword
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
   * @returns {boolean} isFormValid
   * @memberof BooksModal
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'change-password');
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
    * @returns {void}
    * @param {object} event
    * @memberof ChangePassword
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
        this.context.router.push('/');
        this.props.addFlashMessage({
          text: data.data.message,
          type: 'success'
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
       *
       * @returns {object} JSX
       * @memberof ResetPassword
       */
  render() {
    return (
      <div>
        <div className="card-body mx-4">
          <FlashMessagesList />
          {this.state.showChangePasswordForm &&
          <ChangePasswordForm
            isLoading={this.state.isLoading}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            user={this.state.user}
            errors={this.state.errors}
          />
          }
        </div>

        <div
          className=
            "modal-footer mx-sm-4 mx-3 \
            mb-1 mt-3 d-block text-right px-0">
          <p className="font-small grey-text">
            <Link to="/">Goto homepage</Link>
          </p>
        </div>

      </div>
    );
  }
}

ChangePassword.contextTypes = contextTypes;

ChangePassword.propTypes = propTypes;

export { ChangePassword };
export default connect(null, {
  addFlashMessage,
  resetPasswordAction: resetPassword
})(ChangePassword);
