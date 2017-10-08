import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import '../assets/scss/styles.scss';
import '../assets/js/axios';
import '../assets/js/material';

window.API_VERSION = 'v1';

/* eslint-disable require-jsdoc, class-methods-use-this */
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <LoadingBar
          showFastActions
          className = "loadingBar"
        />
        {this.props.children}
      </div>
    );
  }
}

export default App;
