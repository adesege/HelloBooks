import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from '../../flash/FlashMessagesList';

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

        this.props.addFlashMessage({
          type: 'success',
          text: data.data
        });
        // this.context.router.push('/');
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
      <form onSubmit={this.onSubmit} className="row" id="signupForm">
        <div className="col-sm-10 offset-sm-1">
          <FlashMessagesList />
          <div className="form-group">
            <label className="sr-only">Name</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-user"></i></div>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
                value={this.state.name}
                name="name"
                onChange={this.onChange}
              />
            </div>
          </div> { /* form-group */ }
          <div className="form-group">
            <label className="sr-only">Email address</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-envelope"></i></div>
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={this.state.email}
                name="email"
                onChange={this.onChange}
              />
            </div>
          </div> { /* form-group */ }
          <div className="form-group">
            <label className="sr-only">Password</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-key"></i></div>
              <input
                type="password"
                className="form-control"
                placeholder="Your password"
                name="password"
                onChange={this.onChange}
              />
            </div>
          </div> { /* form-group */ }
          <div className="form-group">
            <label className="sr-only">Confirm password</label>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon"><i className="fa fa-keyboard-o"></i></div>
              <input
                type="password"
                className="form-control"
                placeholder="Your password again"
                name="confirmPassword"
                onChange={this.onChange}
              />
            </div>
          </div> { /* form-group */ }
          <div className="form-group text-center">
            <button disabled={this.state.isLoading} type="submit" className="btn btn-success btn-block" name="button">Create my account</button>
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
