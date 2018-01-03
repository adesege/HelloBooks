import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = ({
  interval: 10000
});

const propTypes = {
  children: PropTypes.node.isRequired,
  interval: PropTypes.number.isRequired
};

/**
 * Set timeout component to toggle visibility of a component
 *
 * @class SetTimeout
 *
 * @extends {React.Component}
 */
class SetTimeout extends React.Component {
  /**
   * Creates an instance of SetTimeout.
   *
   * @param {object} props - component props
   *
   * @memberof SetTimeout
   */
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  /**
   * Lifecycle method invoked when component mounts
   *
   * @returns {undefined}
   *
   * @memberof SetTimeout
   */
  componentDidMount() {
    this.setTimer();
  }

  /**
   * Lifecycle method invoked when component will receive props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps - lifecycle next props
   *
   * @memberof SetTimeout
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({
        isVisible: true
      });
    }
  }

  /**
   * Lifecycle method invoked when component will recieve props
   *
   * @returns {undefined}
   *
   * @memberof SetTimeout
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * Set timer
   *
   * @return {undefined}
   *
   * @memberof SetTimeout
  */
  setTimer() {
    // clear object existing timer
    if (this.timer != null) {
      clearTimeout(this.timer);
    }

    // hide after `interval` milliseconds
    this.timer = setTimeout(() => {
      this.setState({ isVisible: false });
      this.timer = null;
    }, this.props.interval);
  }


  /**
   * Render component
   *
   * @returns  {JSX} JSX
   *
   * @memberof SetTimeout
   */
  render() {
    return this.state.isVisible ?
      <div>{this.props.children}</div> :
      <span />;
  }
}

SetTimeout.defaultProps = defaultProps;
SetTimeout.propTypes = propTypes;

export default SetTimeout;
