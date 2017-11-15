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
  <div className=
    {classnames(
      `form-group form-sm ${containerClass || ''}`
      , { 'hide-input-container': hide }
    )}>
    {label && <label className={labelClass} htmlFor={name}>{label}</label> }
    <div className="input-group">
      <div className="input-group-addon">
        {icon && <i className={`fa fa-${icon}`} />}
      </div>

      <input
        type={type}
        className={classnames('form-control')}
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        {...rest} />
    </div>
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
