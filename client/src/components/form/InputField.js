import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import classnames from 'classnames';
=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8

/* eslint-disable require-jsdoc, class-methods-use-this */
class InputField extends React.Component {
  render() {
<<<<<<< HEAD
    const { icon, type, placeholder, name, onChange, label, labelClass, hide, children, ...rest } = this.props;
    return (
      <div
        className={classnames('md-form form-sm', { 'hide-input-container': hide })}>
=======
    const { icon, type, placeholder, name, onChange, label, labelClass } = this.props;
    return (
      <div className="md-form form-sm">
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
        {icon &&
        <i className={`fa fa-${icon} prefix grey-text`} ></i>
        }
        <input
          type={type}
          className={icon ? 'form-control px-0' : 'form-control px-0'}
          id={name}
          placeholder={placeholder}
          name={name}
<<<<<<< HEAD
          onChange={onChange}
          {...rest} />
        <label className={labelClass} htmlFor={name}>{label}</label>
        {children}
=======
          onChange={onChange} />
        <label className={labelClass} htmlFor={name}>{label}</label>
        {this.props.children}
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
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
