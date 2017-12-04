import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import 'assets/scss/styles.scss';
import 'config/axios';

const { TIMEZONE } = process.env;
moment().tz(TIMEZONE).format();

const propTypes = {
  children: PropTypes.object.isRequired
};

/**
 * @returns {object} JSX
 * @param {object} props
 */
const App = ({ children }) => (
  <div className="container-fluid">
    <LoadingBar
      showFastActions
      className = "loadingBar"
    />
    {children}
  </div>
);

App.propTypes = propTypes;
export default App;
