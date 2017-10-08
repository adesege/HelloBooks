import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlashMessagesList from '../../flash/FlashMessagesList';
import InputField from '../../form/InputField';
import Button from '../../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props.userSignupRequest(this.state).then(
      (data) => {
        document.getElementById('signupForm').reset();

        this.setState({
          isLoading: false,
          name: '',
          email: ''
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
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} id="signupForm">
        <FlashMessagesList />
        <InputField
          label="Name"
          name="name"
          onChange={this.onChange}
          value={this.state.name}
          icon="user"
        />

        <InputField
          label="Email address"
          name="email"
          onChange={this.onChange}
          value={this.state.email}
          icon="envelope"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          onChange={this.onChange}
          icon="lock"
        />
        <InputField
          label="Password again"
          type="password"
          name="confirmPassword"
          onChange={this.onChange}
          icon="lock"
        />


        <div className="row align-items-center mb-4">
          <div className="col-md-3 col-md-6">
            <Button
              disabled={this.state.isLoading}
              className="btn-success btn-block z-depth-1"
              name="Signup"
              label = "Signup"
            />
          </div>
          <div className="col-md-6">
            <p
              className="font-small grey-text mb-0 d-flex justify-content-end">
              <Link
                to="/"
                className="blue-text ml-1">I already have an account
              </Link>
            </p>
          </div>

        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupForm;
