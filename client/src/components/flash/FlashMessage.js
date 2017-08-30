import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


/* eslint-disable require-jsdoc, class-methods-use-this */
class FlashMessage extends React.Component {
  componentWillUnmount() {
    this.props.deleteFlashMessage(this.props.message.id);
  }
  render() {
    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error',
        'alert-info': type === 'info'
      })}>
        {(Object.prototype.hasOwnProperty.call(text, 'message')
        && typeof text.message === 'object') &&
            <ul>
              { text.message.map((value, index) =>
                <li key={index}>{value.message}</li>
              ) }
            </ul>
        }
        {(Object.prototype.hasOwnProperty.call(text, 'message')
            && typeof text === 'object') &&
              text.message
        }

        {typeof text === 'string' &&
          text
        }
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
