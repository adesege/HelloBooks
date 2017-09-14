import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from 'halogen/ScaleLoader';
import PropTypes from 'prop-types';
import Button from '../../form/Button';

const $ = window.$;
/**
 * @class BooksList
 * @extends {Component}
 */
/* eslint-disable class-methods-use-this, require-jsdoc */
class BooksList extends Component {
  goToEditPage(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }

  confirmDelete(event) {
    event.preventDefault();
    const $parent = $(event.target).parent();
    this.context.router.push($parent.attr('to'));
  }


  render() {
    const style = {
      display: '-webkit-flex',
      display: 'flex', //eslint-disable-line
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
            <div className="col-sm-4 col-md-3 col-lg-4 col-xl-2 pr-0 col-6 mb-4 book" key={index}>
              <Link to={`/books/view/${object.id}`} className="h-100" style={{ position: 'unset' }}>
                <img className="img-thumbnail" src={ object.coverPhotoPath } alt="Card cap"/>
              </Link>
              <div className="actions ml-3 mb-3">
                <Button
                  className="btn-sm btn-default card-link m-0 mr-2"
                  title="Add to reading list"
                  icon="bookmark" />
                <Button
                  to={`/books/edit/${object.id}`}
                  onClick={this.goToEditPage.bind(this)}
                  className="btn-sm btn-info card-link m-0 mr-2"
                  icon="pencil" />
                <Button
                  to={`/books/delete/${object.id}`}
                  onClick={this.confirmDelete.bind(this)}
                  className="btn-sm btn-danger card-link m-0 mr-2"
                  icon="remove" />
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

BooksList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BooksList;
