import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import '../assets/scss/styles.scss';

window.API_VERSION = 'v1';

const App = ({ children }) => (
  <div className="container-fluid">
    <LoadingBar
      showFastActions
      className = "loadingBar"
    />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
