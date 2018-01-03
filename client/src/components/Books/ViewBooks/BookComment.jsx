import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';

const propTypes = {
  title: PropTypes.string,
  config: PropTypes.object.isRequired
};

/**
 * Book comment component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
 */
const BookComment = ({
  title,
  config
}) => (
  <div className="comments">
    <h4 className="title mt-5 mb-3">Reviews
      <hr/> </h4>
    <ReactDisqusComments
      {...config}
    />
  </div>
);

BookComment.propTypes = propTypes;
export default BookComment;
