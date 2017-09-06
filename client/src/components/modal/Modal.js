import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'bootstrap/js/src/modal';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalId = this.props.modalId;
  }
  componentDidMount() {
    const modalId = this.modalId;
    $('body').on('click', `#${modalId}-btn`, (e) => {
      $(`#${modalId}`).modal('show');
    });
  }

  componentWillUnmount() {
    const modalId = this.modalId;
    const $modal = $(`#${modalId}`);
    $('body').click((event) => {
      if ($modal.attr('data-dismiss') !== 'modal') { console.log('==========');
      $modal.modal('hide');
      }
    });
  }


  render() {
    const { title, children, modalId, size, headerOptions, ...rest } = this.props;
    return (
      <div
        className="modal fade"
        data-backdrop="static"
        id={modalId} tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div
          className={!size ? 'modal-dialog modal-sm' : `modal-dialog ${size}`}
          role="document">
          <div className="modal-content border-0">

            {title && <Header title={title} headerOptions={headerOptions} /> }

            <Body>
              {children}
            </Body>
            <Footer {...rest} />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string,
  btnClass: PropTypes.string,
  btnLabel: PropTypes.string,
  size: PropTypes.string,
  headerOptions: PropTypes.array

};

Modal.defaultProps = {
  size: 'modal-sm'
};

export default Modal;
