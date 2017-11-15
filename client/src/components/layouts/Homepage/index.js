import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../../assets/images/logo.png';

const addBookBg = () => {
  document.querySelector('body').className = 'bg-books';
};

/**
 * @class HomepageLayout
 * @extends {React.Component}
 */
class HomepageLayout extends React.Component {
  /**
   * @returns {void}
   * @memberof HomepageLayout
   */
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.context.router.push('/dashboard');
    } else {
      addBookBg();
    }
  }

  /**
   * @returns {object} JSX
   * @memberof HomepageLayout
   */
  render() {
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
              { (this.props.location.pathname !== '/reset-password') &&
            <div className="text-desc text-center mt-5 mb-0">
              <p className="mb-0">
                HelloBooks is a simple application that helps manage a
                library and its processes like stocking, tracking and renting books.
              </p>
            </div>
              }
            </div>
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}

HomepageLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

HomepageLayout.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(HomepageLayout);
