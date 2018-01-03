import React from 'react';
import PropTypes from 'prop-types';
import { ModalFooter } from 'reactstrap';
import Button from '../form/Button';

const propTypes = {
  closeClass: PropTypes.string,
  closeLabel: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  btnLabel: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnOnClick: PropTypes.func,
  closeOnClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

const defaultProps = {
  closeLabel: 'Close'
};

/**
* Modal footer component
*
* @param {object} props - component props
*
* @returns {JSX} JSX
*/
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
      className={closeClass ?
        `btn-sm ${closeClass || ''}` :
        'btn-sm btn-primary'}
      onClick={closeOnClick}
      label={closeLabel}
    />
    }
  </ModalFooter>
);

Footer.propTypes = propTypes;

Footer.defaultProps = defaultProps;

export default Footer;
