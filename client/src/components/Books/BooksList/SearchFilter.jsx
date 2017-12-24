import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onSearchFilter: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  searchFilter: PropTypes.object.isRequired
};

/**
 * Renders search and filter component
 *
 * @param {func} onChangeInput - method for setting state when input change
 * @param {object} searchFilter - search and filter object
 * @param {array} categories - all categories
 * @param {func} onSearchFilter - submit method for search and filter
 *
 * @returns {JSX} JSX
*/
const SearchFilter = ({
  onChangeInput,
  searchFilter,
  categories,
  onSearchFilter
}) => (
  <form className="form-inline mb-4">
    <div className="form-group">
      <select
        name="bookCategoryId"
        className="form-control form-control-sm mb-md-2 ml-md-2"
        value={searchFilter.bookCategoryId}
        onChange={onChangeInput}
      >
        <option value="">Choose a category</option>
        {categories.map((category) => (<option
          value={category.id}
          key={category.id}
        >{category.name}</option>))}
      </select>
    </div>
    <div className="form-group mb-md-2 ml-md-2">
      <input
        type="text"
        name="author"
        placeholder="Enter author's name"
        className="form-control form-control-sm"
        onChange={onChangeInput}
        value={searchFilter.author}
      />
    </div>
    <div className="form-group mb-md-2 ml-md-2">
      <input
        type="text"
        name="title"
        placeholder="Enter Book title"
        className="form-control form-control-sm"
        onChange={onChangeInput}
        value={searchFilter.title}
      />
    </div>
    <div className="form-group mb-md-2 ml-2">
      <button
        type="submit"
        onClick={onSearchFilter}
        className="btn btn-sm btn-danger">filter</button>
    </div>
  </form>
);

SearchFilter.propTypes = propTypes;

export default SearchFilter;
