import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onSearchFilter: PropTypes.func.isRequired,
  searchFilter: PropTypes.object.isRequired
};

const Filter = ({
  onChangeInput,
  searchFilter,
  onSearchFilter
}) => (
  <form className="form-inline mb-4">
    <select
      className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0"
      name="isReturned"
      onChange={onChangeInput}
      value={searchFilter.isReturned}
    >
      <option value="">by status...</option>
      {searchFilter.isReturned !== false && <option value="true">Returned</option>}
      {searchFilter.isReturned !== true && <option value="false">Yet to Returned</option>}
    </select>
    <select
      className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0"
      name="updatedAt"
      onChange={onChangeInput}
    >
      <option value="">by date...</option>
      <option value={moment().format()}>Today</option>
      <option value={moment().subtract(7, 'days').format()}>Last 7 days</option>
      <option value={moment().subtract(14, 'days').format()}>Last 14 days</option>
      <option value={moment().subtract(1, 'months').format()}>A month ago</option>
    </select>
    <select
      className="form-control form-control-sm mb-2 mr-sm-2 mb-sm-0"
      name="orderBy"
      onChange={onChangeInput}
    >
      <option value="">by name...</option>
      <option value="ASC">A-Z</option>
      <option value="DESC">Z-A</option>
    </select>
    <button
      type="submit"
      className="btn btn-sm btn-danger"
      onClick={onSearchFilter}
    >
  filter
    </button>
  </form>
);

Filter.propTypes = propTypes;

export default Filter;
