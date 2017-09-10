import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from 'halogen/ScaleLoader';

/**
 * @class BooksList
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class BooksList extends Component {
  render() {
    const style = {
      display: '-webkit-flex',
      display: 'flex',
      WebkitFlex: '0 1 auto',
      flex: '0 1 auto',
      WebkitFlexDirection: 'column',
      flexDirection: 'column',
      WebkitFlexGrow: 1,
      flexGrow: 1,
      WebkitFlexShrink: 0,
      flexShrink: 0,
      WebkitFlexBasis: '25%',
      flexBasis: '25%',
      width: '100%',
      height: '100%',
      WebkitAlignItems: 'center',
      alignItems: 'center',
      WebkitJustifyContent: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      backgroundColor: '#fff'
    };

    const emptyMessage = (
      <div style={style}><Loader color="#26A65B"/></div>
    );

    return (
      <div className="row pr-3" id="bookList">
        {
          this.props.content && this.props.content.message ? this.props.content.message.map((object, index) => (
            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-3 pr-0 col-6 mb-4 book">
              <Link to={`/books/view/${object.id}`} className="h-100" style={{ position: 'unset' }}>
                <img className="img-thumbnail" src={ object.coverPhotoPath } alt="Card cap"/>
              </Link>
              <div className="actions">
                <a href="#add" className="card-link" title="Add to reading list">
                  <i className="fa fa-bookmark"></i>
                </a>
                <Link to={`/books/edit/${object.id}`} className="ml-5 card-link">
                  <i className="fa fa-pencil"></i>
                </Link>
              </div>
            </div>
          )) : emptyMessage }
      </div>
    );
    // return (
    //   <div>
    //     {
    //       Object.keys(content).length === 0
    //         ? emptyMessage
    //         : booksList
    //     }
    //   </div>
    // );
  }
}

export default BooksList;
