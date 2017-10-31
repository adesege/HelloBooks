import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/js/dist/modal';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { openModal, closeModal } from '../../assets/js/modal';


/**
 * @class Modal
 * @extends {React.Component}
 */
class Modal extends React.Component {
  /**
     * Creates an instance of Modal.
     * @param {any} props
     * @memberof Modal
     */
  constructor(props) {
    super(props);
    this.modalId = this.props.modalId;
  }

  /**
     * @returns {void}
     * @memberof Modal
     */
  componentDidMount() {
    const { modalId } = this;
    openModal(modalId);
  }


  /**
     * @returns {void}
     * @memberof Modal
     */
  componentWillUnmount() {
    const { modalId } = this;
    closeModal(modalId);
  }


  /**
     * @returns {object} JSX
     * @memberof Modal
     */
  render() {
    const {
      title, children, modalId, size, headerOptions, ...rest
    } = this.props;
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
  headerOptions: PropTypes.array,
  btnDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired
};

Modal.defaultProps = {
  size: 'modal-sm'
};

export default Modal;
