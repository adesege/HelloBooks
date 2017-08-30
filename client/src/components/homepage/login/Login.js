import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { login, setCurrentUser } from '../../../actions/auth';
import { addFlashMessage } from '../../../actions/flashMessages';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Login extends React.Component {
  render() {
    return (
      <div>
        <LoginForm
          login = {this.props.login}
          addFlashMessage = {this.props.addFlashMessage}
          setCurrentUser = {this.props.setCurrentUser}
        />
        <div className="row my-3">
          <div className="col-sm-12">
            <div className="row justify-content-center">
              <div className="col-sm-4 col-5">Sign in with:</div>
              <h4 className="col-sm-1 col-1 mr-1 px-0 text-primary"><i className="fa fa-facebook-official"></i></h4>
              <h4 className="col-sm-1 col-1 mr-1 px-0 text-info"><i className="fa fa-twitter"></i></h4>
              <h4 className="col-sm-1 col-1 mr-1 px-0 text-danger"><i className="fa fa-google-plus"></i></h4>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center mb-5">
          <div className="col-sm-4">
            <Link to="/signup">Create an account</Link>
          </div>
          <div className="col-sm-4">
            <Link to="/reset-password">I forgot my password</Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, addFlashMessage, setCurrentUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
