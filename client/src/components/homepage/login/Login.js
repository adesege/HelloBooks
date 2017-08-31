import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { login, setCurrentUser } from '../../../actions/auth';
import { addFlashMessage } from '../../../actions/flashMessages';
import Button from '../../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Login extends React.Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/dashboard');
    }
  }
  render() {
    return (
      <div>
        <div className="card-body mx-4">
          <LoginForm
            login = {this.props.login}
            addFlashMessage = {this.props.addFlashMessage}
            setCurrentUser = {this.props.setCurrentUser}
          />
          <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>

          <div className="row my-3 d-flex justify-content-center">
            <Button
              type="button"
              className="btn-primary mr-md-3 btn-sm"
              icon="facebook"
              iconClass="text-white text-center"/>

            <Button
              type="button"
              className="btn-info mr-md-3 btn-sm"
              icon="twitter"
              iconClass="text-white text-center"/>

            <Button
              type="button"
              className="btn-danger mr-md-3 btn-sm"
              icon="google-plus"
              iconClass="text-white text-center"/>

          </div>
        </div>

        <div className="modal-footer mx-sm-5 mx-3 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">
          Not a member? <Link to="/signup" className="blue-text ml-1"> Create an account</Link></p>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, addFlashMessage, setCurrentUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
