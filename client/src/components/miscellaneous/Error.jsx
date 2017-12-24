import React from 'react';
import PropTypes from 'prop-types';
import 'assets/scss/error.scss';

const defaultProps = {
  statusCode: 404,
  statusText: 'Not Found',
  description: 'Sorry, we couldn\'t find the ' +
  'resource you were looking for right now.'
};

const propTypes = {
  statusCode: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

/**
 * Error component
 *
 * @name Error
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
 */
const Error = (props) => (
  <div className="not-found-container">
    <div className="not-found-wrapper">
      <h1>
        <span>{props.statusCode} </span>
        <span>{props.statusText}</span>
      </h1>
      <p className="text-muted">
        {props.description}
      </p>
      <ul className="d-flex justify-content-center">
        <li className="d-inline-flex mr-3">
          <a href="/">
            <i className="fa fa-home mr-1"/>
            Go home
          </a>
        </li>
        <li className="d-inline-flex">
          <a href="/docs/v1">
            <i className="fa fa-book mr-1"/>
            API Documentation
          </a>
        </li>
      </ul>
    </div>
  </div>
);

Error.defaultProps = defaultProps;
Error.propTypes = propTypes;

export default Error;
