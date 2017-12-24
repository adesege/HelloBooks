import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from 'components/miscellaneous/Error';

const propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Error boundary
 *
 * @author Temitayo Fadojutimi
 *
 * @class ErrorBoundary
 *
 * @extends {Component}
 */
class ErrorBoundary extends Component {
/**
 * Creates an instance of ErrorBoundary.
 *
 * @author Temitayo Fadojutimi
 *
 * @param {object} props - component props
 *
 * @memberof ErrorBoundary
 */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  /**
   * Component did catch lifecycle
   *
   * @author Temitayo Fadojutimi
   *
   * @param {object} error - error object from react
   * @param {object} info - more information about the error
   *
   * @memberof ErrorBoundary
   *
   * @returns {undefined}
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  /**
   * Renders component
   *
   * @author Temitayo Fadojutimi
   *
   * @returns {undefined}
   *
   * @memberof ErrorBoundary
   */
  render() {
    return (
      <div>
        {this.state.hasError ?
          <Error
            statusCode={500}
            statusText="Internal Server Error"
            description={'Sorry, we encountered an error ' +
            'fulfilling your request. Please try again'}
          /> :
          this.props.children
        }
      </div>
    );
  }
}

ErrorBoundary.propTypes = propTypes;

export default ErrorBoundary;
