import React from 'react';
import PropTypes from 'prop-types';
import { ModalBody } from 'reactstrap';

const Body = ({ children }) => (
  <ModalBody>
    {children}
  </ModalBody>
);

Body.propTypes = {
  children: PropTypes.node.isRequired
};

export default Body;
