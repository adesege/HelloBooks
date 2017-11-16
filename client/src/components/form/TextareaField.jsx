import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ label, ...rest }) => (
  <div className="form-group form-sm">
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
