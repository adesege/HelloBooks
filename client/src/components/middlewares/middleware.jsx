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
   * @class Middleware
   * @extends {React.Component}
   */
export class Middleware extends React.Component {
  /**
     * @returns {void}
     * @memberof Middleware
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
     * @returns {void}
     * @param {object} nextProps
     * @memberof Middleware
     */
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.context.router.push('/');
    }
  }

  /**
     * @returns {object} JSX
     * @memberof Middleware
     */
  render() {
    const ComposedComponent = this.props.composedComponent;
    return (
      <ComposedComponent {...this.props} />
    );
  }
}

Middleware.propTypes = propTypes;

Middleware.contextTypes = contextTypes;


const middleware = (ComposedComponent) => {
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    composedComponent: ComposedComponent,
  });

  return connect(mapStateToProps, { addFlashMessage })(Middleware);
};

export default middleware;
