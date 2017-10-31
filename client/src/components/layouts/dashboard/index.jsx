import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import removeBookBg from '../../../assets/js/layouts/dashboard/removeBookBg';

const DashboardLayout = ({ children }) => {
  removeBookBg();
  return (
    <div>
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer/>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default DashboardLayout;
