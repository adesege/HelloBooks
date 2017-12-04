import React from 'react';
import Menu from './Menu';

/**
 * @returns {JSX} jsx
 * @param {object} props
 */
const Header = (props) => (
  <div>
    <Menu {...props} />
  </div>
);

export default Header;
