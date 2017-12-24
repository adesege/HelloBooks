import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from 'components/FlashMessagesList/FlashMessage';
import SetTimeout from 'components/miscellaneous/SetTimeout';
import { deleteFlashMessage } from 'actions/flashMessages';

const propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessageAction: PropTypes.func.isRequired
};

/**
 * Flash messages listt component
 *
 * @class FlashMessagesList
 *
 * @extends {React}
 */
class FlashMessagesList extends React.Component {
  /**
   * Lifecycle method invoked when component will unmount
   *
   * @returns {undefined}
   *
   * @memberof FlashMessagesList
   */
  componentWillUnmount() {
    this.props.deleteFlashMessageAction();
  }

  /**
   * Renders flasmessage component
   *
   * @returns  {JSX} JSX
   *
   * @memberof FlashMessagesList
   */
  render() {
    const {
      message,
    } = this.props;
    return (
      <SetTimeout interval={10000}>
        {Object.keys(message).length !== 0 &&
    <FlashMessage
      message={message}
    />}
      </SetTimeout>
    );
  }
}

FlashMessagesList.propTypes = propTypes;

/**
 * Get state from store
 *
 * @param {object} state - redux store state
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  message: state.flashMessages
});

export { FlashMessagesList };
export default connect(
  mapStateToProps,
  { deleteFlashMessageAction: deleteFlashMessage }
)(FlashMessagesList);
