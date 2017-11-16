import React from 'react';
import PropTypes from 'prop-types';
import { ModalFooter } from 'reactstrap';
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
  <ModalFooter>
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
          label={closeLabel}
        />
    }
  </ModalFooter>
);

Footer.propTypes = {
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  btnLabel: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnOnClick: PropTypes.func,
  closeOnClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Footer.defaultProps = {
  closeLabel: 'Close'
};

export default Footer;
