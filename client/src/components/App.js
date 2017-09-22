import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import '../assets/css/styles.css';
import '../assets/js/axios';
import '../assets/js/material';

window.API_VERSION = 'v1';

/* eslint-disable require-jsdoc, class-methods-use-this */
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <LoadingBar showFastActions style={{ zIndex: 1000000, marginLeft: '-15px' }} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
