import React from 'react';
import $ from 'jquery';
import LeftSidebar from './sidebar/Left';
import image from '../../assets/images/4.jpg';

window.$ = $;
window.jQuery = $;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Profile extends React.Component {
  render() {
    return (
      <div className="row pr-3 pl-3" id="yetReturn">
        <LeftSidebar />
        <div className="col-sm-8 px-0">
          <h6 className="title">I'm yet to return...</h6>
          <div className="row">
            { [...Array(12)].map((val, index) => (
              <div className="col-sm-6 col-md-6 col-lg-4 col-xs-12 mb-4" key={index}>
                <div className="row">
                  <div className="col-sm-6 col-6 align-self-center">
                    <img className="img-thumbnail" src={image} alt="Card cap"/>
                  </div>
                  <div className="col-sm-6 col-6 p-sm-0 align-self-center">
                    <h6 className="mt-4 mt-sm-0 mb-0"><a href="/book/borrow/1230">Book title</a></h6>
                    <h6 className="mb-1 text-muted"><small>Author 1</small></h6>
                    <h6 className="mb-1 text-muted"><small>June 1st, 2017</small></h6>
                    <a href="#top" className="card-link text-success" data-toggle="tooltip" title="Return book">Return</a>
                  </div>{/* col sm 8 */}
                </div>{/* row  */}
              </div>
            ))}
          </div>{/* row  */}
          <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
        </div>
      </div>
    );
  }
}

