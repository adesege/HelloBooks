import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import '../../../../assets/js/custom';

const Navigation = ({ isAuthenticated, group }) => (
  <div className="collapse sidebar mb-3 h-100" id="sidebar"><ul className="nav flex-column">
    <li className="nav-item closeBtn">
      <a href="#top" className="nav-link">&times;</a>
    </li>
    <li className="nav-item">
      <Link className="nav-link active" to="/dashboard">
        <i className="fa fa-th-large" /> Dashboard
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/books/histories">
        <i className="fa fa-bookmark" /> History
      </Link>
    </li>
    {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/books/categories">
            <i className="fa fa-th-list" /> Book category
          </Link>
        </li>
    }
    <li className="nav-item">
      <Link className="nav-link" to="/books">
        <i className="fa fa-book" /> Books
      </Link>
    </li>
    {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/books/stock-manager">
            <i className="fa fa-archive" /> Stock Manager
          </Link>
        </li>
    }
    <li className="nav-item">
      <Link className="nav-link" to="/me">
        <i className="fa fa-user" /> Profile
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="#top" data-toggle="modal" data-target="#searchModal">
        <i className="fa fa-search-plus" /> Search
      </Link>
    </li>
    {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            <i className="fa fa-cog" /> Settings
          </Link>
        </li>
    }
    <li className="nav-item">
      <a className="nav-link disabled">&copy; 2017. All rights reserved.</a>
    </li>
  </ul></div>
);

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  group: PropTypes.string.isRequired,
};
export default Navigation;
