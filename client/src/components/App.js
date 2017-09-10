import React from 'react';
import $ from 'jquery';
<<<<<<< HEAD
import LoadingBar from 'react-redux-loading-bar';
=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
import '../assets/css/styles.css';
import '../assets/js/axios';
import '../assets/js/material';

window.$ = $;
window.jQuery = $;
window.API_VERSION = 'v1';

/* eslint-disable require-jsdoc, class-methods-use-this */
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
<<<<<<< HEAD
        <LoadingBar showFastActions style={{ zIndex: 1000000, marginLeft: '-15px' }} />
=======
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
        {this.props.children}
      </div>
    );
  }
}

export default App;
