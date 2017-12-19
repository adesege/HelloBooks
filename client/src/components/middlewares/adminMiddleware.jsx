import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from 'actions/flashMessages';

const propTypes = {
  group: PropTypes.string.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  composedComponent: PropTypes.func.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Admin middleware component
 *
 * @class AdminMiddleware
 *
 * @extends {React.Component}
*/
export class AdminMiddleware extends React.Component {
  /**
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof AdminMiddleware
  */
  componentDidMount() {
    if (this.props.group !== 'admin') {
      this.props.addFlashMessage({
        type: 'error',
        text: [
          'Sorry, you don\'t have the right permission to access that page'
        ]
      });
      this.context.router.push('/dashboard');
    }
  }

  /**
   * Lifecycle method invoked when component will update
   *
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof AdminMiddleware
  */
  componentWillUpdate(nextProps) {
    if (nextProps.group !== 'admin') {
      this.context.router.push('/dashboard');
    }
  }

  /**
   * Renders component
   *
   * @returns  {JSX} JSX
   *
   * @memberof AdminMiddleware
  */
  render() {
    const ComposedComponent = this.props.composedComponent;
    return (
      <ComposedComponent {...this.props} />
    );
  }
}

AdminMiddleware.propTypes = propTypes;

AdminMiddleware.contextTypes = contextTypes;

/**
 * Higher order component to
 * render composed comonent for admin user
 *
 * @param {object} ComposedComponent
 *
 * @returns {func} JSX
*/
const adminMiddleware = (ComposedComponent) => {
  /**
   * Get state from store
   *
   * @param {object} state
   *
   * @returns {object} map state to props
 */
  const mapStateToProps = (state) => ({
    group: state.auth.user.group,
    composedComponent: ComposedComponent,
  });

  return connect(mapStateToProps, { addFlashMessage })(AdminMiddleware);
};

export default adminMiddleware;

