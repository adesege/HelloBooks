import React from 'react';
import $ from 'jquery';
import '../assets/css/styles.css';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export default App;
