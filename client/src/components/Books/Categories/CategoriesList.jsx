import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';

const propTypes = {
  onEditClick: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

/**
 * Renders categories list component
 *
 * @param {object} props - component props
 *
 * @returns {JSX} jsx
 */
const CategoriesList = ({
  onEditClick,
  categories,
  onDeleteModal
}) => (
  <div>
    {categories.length !== 0 ?
      <div className="table-responsive">
        <table className="table" id="stockTable">
          <thead className="thead-default">
            <tr>
              <th>#</th>
              <th>Category name</th>
              <th>Date added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <TimeAgo
                    date={category.createdAt}
                    minPeriod={60} />
                </td>
                <td id={category.id}>
                  <i
                    className="fa fa-pencil-square-o btn btn-info btn-sm"
                    onClick={onEditClick}
                  />
                  <i
                    className="fa fa-remove btn btn-danger btn-sm"
                    onClick={onDeleteModal}
                  />
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div> :
      <EmptyMessage absolute={false} />
    }
  </div>
);

CategoriesList.propTypes = propTypes;

export default CategoriesList;
