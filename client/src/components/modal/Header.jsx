import React from 'react';
import PropTypes from 'prop-types';
import { ModalHeader } from 'reactstrap';

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

Header.propTypes = {
  title: PropTypes.string,
  headerOptions: PropTypes.array
};

export default Header;
