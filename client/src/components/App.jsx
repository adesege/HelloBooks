import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import 'assets/scss/styles.scss';
import 'config/axios';
import ErrorBoundary from './miscellaneous/ErrorBoundary';

const { TIMEZONE } = process.env;
moment().tz(TIMEZONE).format();

const propTypes = {
  children: PropTypes.object.isRequired
};

/**
 * App component
 *
 * @returns {JSX} JSX
 *
 * @param {object} props - component props
*/
const App = ({ children }) => (
  <ErrorBoundary>
    <div className="container-fluid">
      <LoadingBar
        showFastActions
        className = "loadingBar"
      />
      {children}
    </div>
  </ErrorBoundary>
);

App.propTypes = propTypes;
export default App;
