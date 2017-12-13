import React from 'react';
import 'assets/scss/notFound.scss';

/**
 * Not found component
 *
 * @name NotFound
 *
 * @returns {JSX} JSX
 */
const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-wrapper">
      <h1>
        <span>404 </span>
        <span>Not Found</span>
      </h1>
      <p className="text-muted">
      Sorry, we couldn't find the resource you were looking for right now.
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

export default NotFound;
