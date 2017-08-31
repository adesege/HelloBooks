import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Button extends React.Component {
  render() {
    const { disabled, type, className, name, label, icon, iconClass } = this.props;
    return (
      <button
        disabled={disabled}
        type={type}
        className={`btn ${className}`}
        name={name}>
        { icon && <i className={`fa fa-${icon} ${iconClass}`}></i> }
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Button.defaultProps = {
  type: 'submit'
};

export default Button;
