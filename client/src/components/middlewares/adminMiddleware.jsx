import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashMessages';

const adminMiddleware = (ComposedComponent) => {
  /**
   * @class AdminMiddleware
   * @extends {React.Component}
   */
  class AdminMiddleware extends React.Component {
    /**
     * @returns {void}
     * @memberof AdminMiddleware
     */
    componentDidMount() {
      if (this.props.group !== 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Sorry, you don\'t have the right permission to access that page'
        });
        this.context.router.push('/dashboard');
      }
    }

    /**
     * @returns {void}
     * @param {object} nextProps
     * @memberof AdminMiddleware
     */
    componentWillUpdate(nextProps) {
      if (nextProps.group !== 'admin') {
        this.context.router.push('/dashboard');
      }
    }

    /**
     * @returns  {object} JSX
     * @memberof AdminMiddleware
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  AdminMiddleware.propTypes = {
    group: PropTypes.string.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  AdminMiddleware.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    group: state.auth.user.group
  });

  return connect(mapStateToProps, { addFlashMessage })(AdminMiddleware);
};

export default adminMiddleware;

