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
 * @class SetTimeout
 * @extends {React.Component}
 */
class SetTimeout extends React.Component {
  /**
   * Creates an instance of SetTimeout.
   * @param {object} props
   * @memberof SetTimeout
   */
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  /**
   * @returns {undefined}
   * @memberof SetTimeout
   */
  componentDidMount() {
    this.setTimer();
  }

  /**
   * @returns {undefined}
   * @param {any} nextProps
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
   * @returns {undefined}
   * @memberof SetTimeout
   */
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * @return {undefiend} undefined
   * @memberof SetTimeout
   */
  setTimer() {
    // clear any existing timer
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
   * @returns  {object} JSX
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
