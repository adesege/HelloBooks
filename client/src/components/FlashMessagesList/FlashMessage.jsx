import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const FlashMessage = ({ message }) => {
  const { type, text } = message;
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

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default FlashMessage;
