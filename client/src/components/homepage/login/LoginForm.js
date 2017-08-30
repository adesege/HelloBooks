import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from '../../flash/FlashMessagesList';
import setAuthorizationToken from '../../../assets/js/setAuthorizationToken';

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
      <form onSubmit={this.onSubmit} className="row">
        <div className="col-sm-10 offset-sm-1">
          <FlashMessagesList />
          <div className="form-group">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Email address</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-user"></i></div>
              <input type="email" className="form-control" id="inlineFormInputGroup" placeholder="Email address" name="email" onChange={this.onChange} />
            </div>
          </div> { /* form-group */ }
          <div className="form-group">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-keyboard-o"></i></div>
              <input type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" name="password" onChange={this.onChange} />
            </div>
          </div> { /* form-group */ }
          <div className="form-group text-center">
            <button disabled={this.state.isLoading} type="submit" className="btn btn-success btn-block" name="button">Login</button>
          </div>
        </div>
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
