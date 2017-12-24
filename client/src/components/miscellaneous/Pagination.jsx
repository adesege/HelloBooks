import React from 'react';
import PropTypes from 'prop-types';
import PaginationJs from 'react-js-pagination';

const propTypes = ({
  pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired
});

const defaultProps = ({
  itemClass: "page-item",
  innerClass: "pagination pagination-sm justify-content-center",
  linkClass: "page-link",
  prevPageText: "Previous",
  firstPageText: "First",
  lastPageText: "Last",
  nextPageText: "Next",
  pageRangeDisplayed: 5
});

/**
 * Pagination component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} JSX
*/
const Pagination = ({
  pagination,
  handlePageChange,
  ...rest
}) => (
  <PaginationJs
    activePage={pagination.page}
    itemsCountPerPage={pagination.limit}
    totalItemsCount={pagination.totalCount}
    onChange={handlePageChange}
    {...rest}
  />
);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
