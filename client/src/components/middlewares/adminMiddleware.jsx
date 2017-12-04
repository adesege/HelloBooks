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
   * @class AdminMiddleware
   * @extends {React.Component}
   */
export class AdminMiddleware extends React.Component {
  /**
     * @returns {void}
     * @memberof AdminMiddleware
     */
  componentDidMount() {
    if (this.props.group !== 'admin') {
      this.props.addFlashMessage({
        type: 'error',
        text: ['Sorry, you don\'t have the right permission to access that page']
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
    const ComposedComponent = this.props.composedComponent;
    return (
      <ComposedComponent {...this.props} />
    );
  }
}

AdminMiddleware.propTypes = propTypes;

AdminMiddleware.contextTypes = contextTypes;

const adminMiddleware = (ComposedComponent) => {
  const mapStateToProps = (state) => ({
    group: state.auth.user.group,
    composedComponent: ComposedComponent,
  });

  return connect(mapStateToProps, { addFlashMessage })(AdminMiddleware);
};

export default adminMiddleware;

