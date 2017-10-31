import React from 'react';
import DashboardLeftSidebar from '../../dashboard/sidebar/Left';
import bookCover from '../../../assets/images/0.jpg';
import relatedImage from '../../../assets/images/4.jpg';
import user from '../../../assets/images/user.png';

const Sidebar = () => (
  <div className="row" id="borrowBook">
    <div className="col-sm-8">
      <div className="row" id="book-details">
        <div className="col-sm-4">
          <img className="img-thumbnails cover" src={bookCover} alt="Card cap"/>
          <div className="btn-group btn-group-sm w-100 my-2" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-primary btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> I want to... </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item" href="#top">read</a>
              <a className="dropdown-item" href="#top" data-toggle="modal" data-target="#confirmBorrowModal">borrow</a>
            </div>
          </div>
        </div>
        <div className="col-sm-8 mt-3 mt-sm-0">
          <div className="details">
            <h4 className="card-title font-weight-bold">A super book title</h4>
            <h6 className="card-subtitle">
              by Author1
              <div className="rating d-inline">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
            </h6>
            <p className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <hr/>
            <small className="mt-1 d-block">
              <em className="d-block">Published date: August 11, 1843</em>
              <em className="d-block">ISSBN: 74638346556897</em>
              <em className="d-block">Category: Category 1</em>
            </small>
          </div>
        </div>
      </div>
      <div className="related row">
        <div className="col-sm-10 offset-sm-1">
          <h4 className="title text-center mt-5 mb-3">Related</h4>
          <div className="row mx-auto">
            { [...Array(4)].map((val, index) => (
              <div className="col-sm-3 col-6 p-1" key={index}>
                <img className="img-thumbnail h-100 w-100" alt="" src={relatedImage}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="comments">
        <h4 className="title mt-5 mb-3">Reviews <hr/> </h4>
        <div className="card mb-3">
          <div className="card-block p-0">
            <form>
              <div className="form-group mb-0">
                <textarea className="form-control border-0" style={{ minHeight: '120px' }} placeholder="What do you think about this great book?" />
              </div>
            </form>
          </div>
          <div className="card-footer text-right">
            <div className="form-group mb-0">
              <div className="rating d-inline mr-2">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div>
              <button className="btn btn-outline-info btn-sm mr-2" title="Add an image">
                <i className="fa fa-camera-retro" />
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
                <i className="fa fa-calendar" /> Feb 14th, 2017
              </p>
            </div>
            <div className="col-sm-10 col-8 col-md-8 col-lg-10 pr-0">
              <p className="small mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="p-2 text-center text-lg-left">
                <a className="mr-3 mb-2" title="Like" href="#top">
                  <i className="fa fa-thumbs-up" />
                  <span>1 Likes</span></a>
                <a className="mr-2 mb-2" title="Reply" href="#top">
                  <i className="fa fa-reply" />
                  <span>Reply</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary bg-light btn-block mb-3">See more</button>
      </div>
    </div>

    <DashboardLeftSidebar className="col-sm-4"/>

  </div>
);

export default Sidebar;
