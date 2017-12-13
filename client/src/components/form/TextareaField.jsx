import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
};

/**
 * Textarea component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const Textarea = ({ label, ...rest }) => (
  <div className="form-group form-sm">
    <textarea {...rest}>
      {label}
    </textarea>
  </div>
);

Textarea.propTypes = propTypes;

export default Textarea;
