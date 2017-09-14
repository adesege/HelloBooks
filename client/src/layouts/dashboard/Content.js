import React from 'react';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class DashboardLayout extends React.Component {
  render() {
    return (
      <div id="contentArea">
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}
