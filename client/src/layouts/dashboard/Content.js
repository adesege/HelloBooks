import React from 'react';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class DashboardLayout extends React.Component {
  render() {
    return (
      <div id="contentArea">
        {this.props.children}
      </div>
    );
  }
}
