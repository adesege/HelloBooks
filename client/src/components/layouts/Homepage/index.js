import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from 'assets/images/logo.png';

const addBookBg = () => {
  document.querySelector('body').className += ' bg-books';
};

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

const Homepage = (props, context) => {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    context.router.push('/dashboard');
  } else {
    addBookBg();
  }

  return (
    <section className="row form-elegant">
      <div
        className=
          "col-sm-10 col-md-8 col-lg-4 col-12 offset-sm-1 \
           offset-md-2 offset-lg-4 mt-sm-5 mb-sm-5 pt-sm-4 p-0"
      >
        <div className="card">
          <div className="card-header bg-white border-bottom-0 mb-3">
            <div className="mt-3 navbar-brand text-center d-block">
              <img src={logo} alt="" />
            </div>
            { (props.location.pathname !== '/reset-password') &&
            <div className="text-desc text-center mt-5 mb-0">
              <p className="mb-0">
                HelloBooks is a simple application that helps manage a
                library and its processes like stocking, tracking and renting books.
              </p>
            </div>
            }
          </div>
          {props.children}
        </div>
      </div>
    </section>
  );
};


Homepage.propTypes = propTypes;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

Homepage.contextTypes = contextTypes;

export default connect(mapStateToProps)(Homepage);
