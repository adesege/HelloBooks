import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

const Footer = ({
  closeClass,
  closeLabel,
  btnClass,
  btnLabel,
  btnOnClick,
  btnDisabled,
  closeOnClick
}) => (
  <div className="modal-footer border-top-0">
    { btnClass &&
        <Button type="button"
          className={`btn-sm ${btnClass}`}
          label={btnLabel}
          onClick={btnOnClick}
          disabled={btnDisabled} />
    }

    {closeLabel &&
        <Button type="button"
          className={closeClass ? `btn-sm ${closeClass || ''}` : 'btn-sm btn-primary'}
          onClick={closeOnClick}
          data-dismiss={closeOnClick ? '' : 'modal'}
          label={closeLabel} />
    }
  </div>
);

Footer.propTypes = {
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  btnLabel: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnOnClick: PropTypes.func
};

Footer.defaultProps = {
  closeLabel: 'Close'
};

export default Footer;
