import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Footer extends React.Component {
  render() {
<<<<<<< HEAD
    const { closeClass, closeLabel, btnClass, btnLabel, btnOnClick, btnDisabled } = this.props;
=======
    const { closeClass, closeLabel, btnClass, btnLabel, btnOnClick } = this.props;
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
    return (
      <div className="modal-footer border-top-0">
        { btnClass &&
        <Button type="button"
          className={`btn-sm ${btnClass}`}
          label={btnLabel}
<<<<<<< HEAD
          onClick={btnOnClick}
          disabled={btnDisabled} />
=======
          onClick={btnOnClick} />
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
        }

        {closeLabel &&
        <Button type="button"
<<<<<<< HEAD
          className={closeClass ? `btn-sm ${closeClass || ''}` : 'btn-sm btn-primary'}
=======
          className={closeClass ? `btn-sm ${closeClass}` : 'btn-sm btn-primary'}
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
          data-dismiss="modal"
          label={closeLabel} />
        }
      </div>
    );
  }
}

Footer.propTypes = {
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
<<<<<<< HEAD
  btnLabel: PropTypes.string,
  btnDisabled: PropTypes.bool
=======
  btnLabel: PropTypes.string
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
};

Footer.defaultProps = {
  closeLabel: 'Close'
};

export default Footer;
