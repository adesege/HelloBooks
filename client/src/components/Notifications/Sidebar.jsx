import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'form/InputField';
import Button from 'form/Button';

const propTypes = {
  searchFilter: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

/**
 * Sidebar component
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const Sidebar = ({
  searchFilter,
  handleInputChange,
  onFilterSubmit,
  errors
}) => (
  <div
    className="col-sm-4 flex-first flex-sm-first mb-5 mb-sm-0 col-md-4 col-lg-3"
  >
    <div className="card mb-3">
      <div className="card-header">
        <span>Filter by</span>
      </div>
      <form>
        <div className="card-block p-4">
          <div className="form-group">
            <select
              className="form-control form-control-sm"
              name="notificationType"
              onChange={handleInputChange}>
              <option value="">Please select</option>
              <option value="BOOK_RETURNED">Returned</option>
              <option value="BOOK_BORROWED">Borrowed</option>
            </select>
          </div>
          <div className="form-group">
            <InputField
              placeholder="Enter user's name"
              icon="user"
              value={searchFilter.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
        </div>
        <div className="card-footer">
          <Button
            onClick={onFilterSubmit}
            type="submit"
            className="btn-danger mr-1"
            label="filter" />
          <Button
            type="reset"
            className="btn-warning"
            label="reset" />
        </div>
      </form>
    </div>
  </div>
);

Sidebar.propTypes = propTypes;

export default Sidebar;

