import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from '../../components/flash/FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';


const FlashMessagesList = ({
  messages,
  deleteFlashMessageAction
}) => (
  <div>
    {messages.map(message =>
      (<FlashMessage
        key={message.id}
        message={message}
        deleteFlashMessage={deleteFlashMessageAction}
      />))
    }
  </div>
);

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessageAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(
  mapStateToProps,
  { deleteFlashMessageAction: deleteFlashMessage }
)(FlashMessagesList);
