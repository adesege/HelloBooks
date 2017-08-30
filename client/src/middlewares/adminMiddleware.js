import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessages';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default function adminMiddleware(ComposedComponent) {
  class AdminMiddleware extends React.Component {
    componentWillMount() {
      if (this.props.group !== 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Sorry, you don\'t have the right permission to access that page'
        });
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.group !== 'admin') {
        this.context.router.push('/dashboard');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  AdminMiddleware.propTypes = {
    group: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  AdminMiddleware.contextTypes = {
    router: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      group: state.auth.group
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(AdminMiddleware);
}
