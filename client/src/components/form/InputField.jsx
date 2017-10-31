import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputField = ({
  icon,
  type,
  placeholder,
  name,
  onChange,
  label,
  labelClass,
  hide,
  children,
  containerClass,
  ...rest
}) => (
  <div
    className=
      {classnames(
        `md-form form-sm ${containerClass || ''}`
        , { 'hide-input-container': hide }
      )}>
    {icon &&
        <i className={`fa fa-${icon} prefix grey-text`} />
    }
    <input
      type={type}
      className={classnames('form-control px-0')}
      id={name}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      {...rest} />
    {label && <label className={labelClass} htmlFor={name}>{label}</label> }
    {children}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  hide: PropTypes.bool,
  children: PropTypes.node,
  containerClass: PropTypes.string
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;
