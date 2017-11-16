import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';


const CategoriesList = ({
  onEditClick,
  categories,
  onDeleteModal
}) => (
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
  </div>
);

CategoriesList.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

export default CategoriesList;
