import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from 'components/FlashMessagesList';

const propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Content component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
 */
const Content = ({ children }) => (
  <div id="contentArea">
    <FlashMessagesList />
    {children}
  </div>
);

Content.propTypes = propTypes;

export default Content;
