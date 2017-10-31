import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ label, ...rest }) => (
  <div className="md-form form-sm">
    <textarea {...rest}>
      {label}
    </textarea>
  </div>
);

Textarea.propTypes = {
  label: PropTypes.string,
};

Textarea.defaultProps = {
};

export default Textarea;
