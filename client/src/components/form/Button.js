import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Button extends React.Component {
  render() {
    const {
      children,
      disabled,
      type,
      className,
      name,
      label,
      icon,
      iconClass,
      ...rest
    } = this.props;
    return (
      <button
        disabled={disabled}
        type={type}
        className={`btn btn-sm ${className}`}
        name={name}
        {...rest}
      >
        { icon && <i className={`fa fa-${icon} ${iconClass}`}></i> }
        {label}
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  iconClass: PropTypes.string
};

Button.defaultProps = {
  type: 'submit'
};

export default Button;
