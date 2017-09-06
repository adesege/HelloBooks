import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FlashMessagesList from '../../flash/FlashMessagesList';
import setAuthorizationToken from '../../../assets/js/setAuthorizationToken';
import InputField from '../../form/InputField';
import Button from '../../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    this.props.login(this.state).then(
      (data) => {
        this.setState({
          isLoading: false
        });

        const token = data.data.token;
        const userPayload = {
          group: data.data.group,
          userId: data.data.userId
        };

        localStorage.setItem('authToken', token);
        localStorage.setItem('userPayload', JSON.stringify(userPayload));

        setAuthorizationToken(token);
        this.props.setCurrentUser(userPayload);

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
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FlashMessagesList />
        <InputField
          type="email"
          label="Email address"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          icon="user"
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          onChange={this.onChange}
          icon="lock"
        >
          <p
            className="font-small d-flex justify-content-end">
        Forgot <Link to="/reset-password" className="blue-text ml-1"> Password?</Link>
          </p>
        </InputField>

        <Button
          disabled={this.state.isLoading}
          className="btn-success btn-block"
          name="Login"
          label = "Login"
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginForm;
