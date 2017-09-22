import 'bootstrap/dist/js/bootstrap.min';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class DashboardLayout extends React.Component {
  componentWillMount() {
    $('body').removeClass('bg-books');
  }
  render() {
    return (
      <div>
        <Header/>
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
      </div>
    );
  }
}
