import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from 'components/flash/FlashMessage';
import SetTimeout from 'components/miscellaneous/SetTimeout';
import { deleteFlashMessage } from 'actions/flashMessages';


const FlashMessagesList = ({
  message,
  deleteFlashMessageAction
}) => (
  <SetTimeout interval={10000}>
    {Object.keys(message).length !== 0 &&
    <FlashMessage
      message={message}
      deleteFlashMessage={deleteFlashMessageAction}
    />}
  </SetTimeout>
);

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
