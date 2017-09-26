import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../../assets/js/custom';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Navigation extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const { group } = this.props.auth.user;
    return (
      <div className="collapse sidebar mb-3 h-100" id="sidebar"><ul className="nav flex-column">
        <li className="nav-item closeBtn">
          <a href="#top" className="nav-link">&times;</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/dashboard">
            <i className="fa fa-th-large"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/books/histories">
            <i className="fa fa-bookmark"></i> History
          </Link>
        </li>
        {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/books/categories">
            <i className="fa fa-th-list"></i> Book category
          </Link>
        </li>
        }
        <li className="nav-item">
          <Link className="nav-link" to="/books">
            <i className="fa fa-book"></i> Books
          </Link>
        </li>
        {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/books/stock-manager">
            <i className="fa fa-archive"></i> Stock Manager
          </Link>
        </li>
        }
        <li className="nav-item">
          <Link className="nav-link" to="/me">
            <i className="fa fa-user"></i> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#top" data-toggle="modal" data-target="#searchModal">
            <i className="fa fa-search-plus"></i> Search
          </Link>
        </li>
        {(isAuthenticated && group === 'admin') &&
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            <i className="fa fa-cog"></i> Settings
          </Link>
        </li>
        }
        <li className="nav-item">
          <a className="nav-link disabled">&copy; 2017. All rights reserved.</a>
        </li>
      </ul></div>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(Navigation);
