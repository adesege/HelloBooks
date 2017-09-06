import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Header extends React.Component {
  render() {
    const { title, headerOptions } = this.props;
    return (
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <div>
          {
            headerOptions.map((element, index) => element)
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  headerOptions: PropTypes.array
};

export default Header;
