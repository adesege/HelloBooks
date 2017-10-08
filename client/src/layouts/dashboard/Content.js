import React from 'react';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default props => (
  <div id="contentArea">
    <FlashMessagesList />
    {props.children}
  </div>
);
