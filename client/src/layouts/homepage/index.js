import React from 'react';
import logo from '../../assets/images/logo.png';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class HomepageLayout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 col-lg-4 col-12 offset-sm-1 offset-md-3 offset-lg-4 mt-sm-5 mb-sm-5 pt-4" id="homeLogin">
          <div className="navbar-brand text-center d-block mb-3"><img src={logo} alt="" /></div>
          { (this.props.location.pathname !== '/reset-password') &&
            <div className="text-desc text-center col-sm-10 offset-sm-1">
              <p className="mb-3">HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books.</p></div>
          }
          {this.props.children}
        </div>
      </div>
    );
  }

  componentWillMount() {
    $('body').addClass('bg-books');
  }
}

export default HomepageLayout;
