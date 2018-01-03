import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  message: PropTypes.object.isRequired
};

/**
 * Displays flashmessages as a list or inline
 *
 * @returns {JSX} JSX
 *
 * @param {object} props - component props
 */
const FlashMessage = (props) => {
  const { type, text } = props.message;
  return (
    <div className={classnames('alert', {
      'alert-success': type === 'success',
      'alert-danger': type === 'error',
      'alert-info': type === 'info'
    })}>
      {Array.isArray(text) && text.length > 1 &&
        <ul>
          { text.map((value, index) =>
            <li key={index}>{value}</li>) }
        </ul>
      }
      {text.length === 1 && <span>{text[0]}</span>}
    </div>
  );
};

FlashMessage.propTypes = propTypes;

export default FlashMessage;
