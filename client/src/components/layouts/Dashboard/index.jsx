import React from 'react';
import PropTypes from 'prop-types';
import removeBookBg from 'assets/js/removeBookBg';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const Dashboard = ({ children }) => {
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

Dashboard.propTypes = {
  children: PropTypes.node
};

export default Dashboard;
