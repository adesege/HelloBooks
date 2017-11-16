import React from 'react';
import PropTypes from 'prop-types';
import FlashMessagesList from '../../flash/FlashMessagesList';

const Content = ({ children }) => (
  <div id="contentArea">
    <FlashMessagesList />
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired
};
export default Content;
