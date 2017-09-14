import React from 'react';
import user from '../../../assets/images/user.png';

/* eslint-disable require-jsdoc, class-methods-use-this */
class BookComment extends React.Component {
  render() {
    return (
      <div className="comments">
        <h4 className="title mt-5 mb-3">Reviews <hr/> </h4>
        <div className="card mb-3">
          <div className="card-block p-0">
            <form>
              <div className="form-group mb-0">
                <textarea className="form-control border-0" style={{ minHeight: '120px' }} placeholder="What do you think about this great book?"></textarea>
              </div>
            </form>
          </div>
          <div className="card-footer text-right">
            <div className="form-group mb-0">
              <div className="rating d-inline mr-2">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
              <button className="btn btn-outline-info btn-sm mr-2" title="Add an image">
                <i className="fa fa-camera-retro"></i>
              </button>
              <button className="btn btn-success btn-sm">Submit</button>
            </div>
          </div>
        </div>

        { [...Array(6)].map((val, index) => (
          <div className="row mb-3 bordered p-2 mx-auto" key={index}>
            <div className="col-sm-2 col-4 col-md-4 text-center px-0 col-lg-2">
              <img className="rounded-circle img-thumbnail w-100" alt="" src={user} style={{ borderRadius: '50px' }}/>
              <p className="small font-weight-bold mb-1">User's name</p>
              <p className="small">
                <i className='fa fa-calendar'></i> Feb 14th, 2017
              </p>
            </div>
            <div className="col-sm-10 col-8 col-md-8 col-lg-10 pr-0">
              <p className="small mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="p-2 text-center text-lg-left">
                <a className="mr-3 mb-2" title="Like" href="#top">
                  <i className='fa fa-thumbs-up'></i>
                  <span>1 Likes</span></a>
                <a className="mr-2 mb-2" title="Reply" href="#top">
                  <i className='fa fa-reply'></i>
                  <span>Reply</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
      </div>
    );
  }
}

export default BookComment;
