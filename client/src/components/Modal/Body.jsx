import React from 'react';
import PropTypes from 'prop-types';
import { ModalBody } from 'reactstrap';

const propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Modal body component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const Body = ({ children }) => (
  <ModalBody>
    {children}
  </ModalBody>
);

Body.propTypes = propTypes;

export default Body;
