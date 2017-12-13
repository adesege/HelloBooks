import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from 'actions/flashMessages';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  composedComponent: PropTypes.func.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Authentucatuin middleware component
 *
 * @class Middleware
 *
 * @extends {React.Component}
*/
export class AuthMiddleware extends React.Component {
  /**
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof AuthMiddleware
  */
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You need to be logged in to access that page'
      });
      this.context.router.push('/');
    }
  }


  /**
   * Lifecycle method invoked when component will update
   *
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof AuthMiddleware
  */
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  /**
   * Renders component
   *
   * @returns {JSX} JSX
   *
   * @memberof AuthMiddleware
  */
  render() {
    const ComposedComponent = this.props.composedComponent;
    return (
      <ComposedComponent {...this.props} />
    );
  }
}

AuthMiddleware.propTypes = propTypes;

AuthMiddleware.contextTypes = contextTypes;

/**
 * Higher order component to
 * render composed comonent for user
 *
 * @param {object} ComposedComponent
 *
 * @returns {func} JSX
*/
const authMiddleware = (ComposedComponent) => {
  /**
   * Get state from store
   *
   * @param {object} state
   *
   * @returns {object} map state to props
  */
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    composedComponent: ComposedComponent,
  });

  return connect(mapStateToProps, { addFlashMessage })(AuthMiddleware);
};

export default authMiddleware;
