import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

/* eslint-disable require-jsdoc, class-methods-use-this */
class Footer extends React.Component {
  render() {
    const { closeClass, closeLabel, btnClass, btnLabel, btnOnClick } = this.props;
    return (
      <div className="modal-footer border-top-0">
        { btnClass &&
        <Button type="button"
          className={`btn-sm ${btnClass}`}
          label={btnLabel}
          onClick={btnOnClick} />
        }

        {closeLabel &&
        <Button type="button"
          className={closeClass ? `btn-sm ${closeClass}` : 'btn-sm btn-primary'}
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
  btnLabel: PropTypes.string
};

Footer.defaultProps = {
  closeLabel: 'Close'
};

export default Footer;
