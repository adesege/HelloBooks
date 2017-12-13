import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  headerOptions: PropTypes.array
};

/**
 * Modal header component
 *
 * @param {object} propTypes
 *
 * @returns {JSX} JSX
 */
const Header = ({ title, headerOptions }) => (
  <div className="modal-header">
    <h5 className="modal-title">{title}</h5>
    { headerOptions && <div>
      {
        headerOptions.map((element, index) => element)
      }
    </div> }
  </div>
);

Header.propTypes = propTypes;

export default Header;
