import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable require-jsdoc, class-methods-use-this */
class InputField extends React.Component {
  render() {
    const { icon, type, placeholder, name, onChange, label, labelClass, hide, children, ...rest } = this.props;
    return (
      <div
        className={classnames('md-form form-sm', { 'hide-input-container': hide })}>
        {icon &&
        <i className={`fa fa-${icon} prefix grey-text`} ></i>
        }
        <input
          type={type}
          className={icon ? 'form-control px-0' : 'form-control px-0'}
          id={name}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          {...rest} />
        <label className={labelClass} htmlFor={name}>{label}</label>
        {children}
      </div>
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelClass: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;
