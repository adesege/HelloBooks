import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootstrapModal } from 'reactstrap';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const propTypes = {
  title: PropTypes.string,
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string,
  btnClass: PropTypes.string,
  btnLabel: PropTypes.string,
  size: PropTypes.string,
  headerOptions: PropTypes.array,
  btnDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleOpenModal: PropTypes.func.isRequired,
  backdrop: PropTypes.string,
  onClosed: PropTypes.func
};

const defaultProps = {
  size: 'modal-sm',
  backdrop: 'static'
};

/**
 * Modal component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const Modal = (props) => (
  <BootstrapModal
    size={!props.size ? 'modal-sm' : `${props.size}`}
    isOpen={props.isOpenModal}
    toggle={props.toggleOpenModal}
    backdrop={props.backdrop}
    onClosed={props.onClosed}
  >

    {props.title &&
    <Header
      title={props.title}
      headerOptions={props.headerOptions}
    />
    }
    <Body>
      {props.children}
    </Body>
    <Footer {...props} />
  </BootstrapModal>
);

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
