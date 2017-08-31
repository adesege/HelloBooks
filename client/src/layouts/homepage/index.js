import React from 'react';
import logo from '../../assets/images/logo.png';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
class HomepageLayout extends React.Component {
  render() {
    return (
      <section className="row form-elegant">
        <div className="col-sm-10 col-md-8 col-lg-4 col-12 offset-sm-1 offset-md-2 offset-lg-4 mt-sm-5 mb-sm-5 pt-sm-4 p-0">
          <div className="card">
            <div className="card-header bg-white border-bottom-0">
              <div className="navbar-brand text-center d-block"><img src={logo} alt="" /></div>
              { (this.props.location.pathname !== '/reset-password') &&
            <div className="text-desc text-center mb-0">
              <p className="mb-0">HelloBooks is a simple application that helps manage a library and its processes like stocking, tracking and renting books.</p></div>
              }
            </div>
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }

  componentWillMount() {
    $('body').addClass('bg-books');
  }
}

export default HomepageLayout;
