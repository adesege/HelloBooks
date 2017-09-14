import React from 'react';
import Menu from './Menu';
import Navigation from './sidebar/Navigation';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <Menu />
        <Navigation />
        { this.props.children }
      </div>
    );
  }
}
