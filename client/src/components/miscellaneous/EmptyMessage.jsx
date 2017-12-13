import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'assets/scss/emptyMessage.scss';

const propTypes = ({
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  absolute: PropTypes.bool.isRequired
});

const defaultProps = {
  icon: 'exclamation-circle',
  text: 'Sorry, no record is available',
  absolute: true
};

/**
 * Empty message component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const EmptyMessage = ({
  text,
  icon,
  absolute
}) => (
  <div
    className={classnames(
      "empty-message text-center d-sm-flex align-items-center justify-content-center flex-column",
      {
        "position-absolute": absolute
      }
    )}>
    <i className={`fa fa-${icon} text-warning`} />
    <p className="message text-muted">
      {text}
    </p>
  </div>
);


EmptyMessage.propTypes = propTypes;
EmptyMessage.defaultProps = defaultProps;

export default EmptyMessage;
