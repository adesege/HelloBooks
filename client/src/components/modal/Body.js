import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Body extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="modal-body pt-4 border-bottom-0">
        {children}
      </div>
    );
  }
}

Body.propTypes = {
};

export default Body;
