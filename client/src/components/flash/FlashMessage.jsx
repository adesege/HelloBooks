import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


/**
 * @class FlashMessage
 * @extends {React.Component}
 */
class FlashMessage extends React.Component {
  /**
   * @returns {undefined}
   * @memberOf FlashMessage
   */
  componentWillUnmount() {
    this.props.deleteFlashMessage();
  }

  /**
     * @returns {object} JSX
     * @memberof FlashMessage
     */
  render() {
    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error',
        'alert-info': type === 'info'
      })}>
        {Array.isArray(text) && text.length !== 1 &&
            <ul>
              { text.map((value, index) =>
                <li key={index}>{value}</li>) }
            </ul>
        }
        {text.length === 1 && <span>{text}</span>}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

export default FlashMessage;
