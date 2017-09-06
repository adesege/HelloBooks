import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Textarea extends React.Component {
  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="md-form form-sm">
        <textarea {...rest}>
          {label}
        </textarea>
      </div>
    );
  }
}

Textarea.propTypes = {
  label: PropTypes.string,
};

Textarea.defaultProps = {
};

export default Textarea;
