import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from 'components/FlashMessagesList/FlashMessage';
import SetTimeout from 'components/miscellaneous/SetTimeout';
import { deleteFlashMessage } from 'actions/flashMessages';


/**
 * @class FlashMessagesList
 * @extends {React}
 */
class FlashMessagesList extends React.Component {
  /**
   * @returns {undefined}
   * @memberof FlashMessagesList
   */
  componentWillUnmount() {
    this.props.deleteFlashMessageAction();
  }

  /**
   * @returns  {JSX} JSX
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

FlashMessagesList.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessageAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message: state.flashMessages
});

export default connect(
  mapStateToProps,
  { deleteFlashMessageAction: deleteFlashMessage }
)(FlashMessagesList);
