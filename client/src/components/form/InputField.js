import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class InputField extends React.Component {
  render() {
    const { icon, type, placeholder, name, onChange, label, labelClass } = this.props;
    return (
      <div className="md-form form-sm">
        {icon &&
        <i className={`fa fa-${icon} prefix grey-text`} ></i>
        }
        <input
          type={type}
          className={icon ? 'form-control px-0' : 'form-control px-0'}
          id={name}
          placeholder={placeholder}
          name={name}
          onChange={onChange} />
        <label className={labelClass} htmlFor={name}>{label}</label>
        {this.props.children}
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
