import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import Button from '../../form/Button';


const CategoriesList = ({ onEditClick, categories, onDeleteModal }) => (
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
          <tr key={index} id={category.id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>
              <TimeAgo
                date={category.createdAt}
                minPeriod={60} />
            </td>
            <td>
              <Button
                className="btn-sm btn-info"
                onClick={onEditClick}
                icon="pencil-square-o"/>
              <Button
                className="btn-sm btn-danger"
                onClick={onDeleteModal}
                icon="remove" />
            </td>
          </tr>
        ))
        }
      </tbody>
    </table>
    <a href=""
      className="btn btn-primary bg-light btn-sm mb-3">
    See more
    </a>
  </div>
);

CategoriesList.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

export default CategoriesList;
