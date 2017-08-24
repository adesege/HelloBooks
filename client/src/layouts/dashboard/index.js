import 'bootstrap/js/src/tooltip';
import 'bootstrap/js/src/collapse';
import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

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
