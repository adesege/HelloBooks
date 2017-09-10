import React from 'react';
import logo2 from '../../../assets/images/1.jpg';

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Header extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="card mb-3">
          <div className="card-header">
            <span>Most read</span>
          </div>
          <div className="row m-2">
            { [...Array(4)].map((val, index) => (
              <div className="col-sm-6 col-6 px-0 pr-1 mb-1" key={index}>
                <a href="/books/borrow/index.html">
                  <img className="img-thumbnail w-100 h-100" src={ logo2 } alt="Card cap"/>
                </a>
              </div>
            )) }
          </div>{ /* card block */ }
        </div>{ /* card */ }
        <div className="card mb-3">
          <div className="card-header">
            <span>Browse by</span>
          </div>
          <div className="card-block">
            <a href="/books/books/index.html" className="d-block small">> Category 1</a>
            <a href="/books/books/index.html" className="d-block small">> Category 2</a>
            <a href="/books/books/index.html" className="d-block small">> Category 3</a>
            <a href="/books/books/index.html" className="d-block small">> Category 4</a>
          </div>{ /* card block */ }
        </div>{ /* card */ }
      </div>
    );
  }
}
