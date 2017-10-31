import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import Button from '../../../form/Button';

const StockList = ({ stocks, onDeleteModal }) => (
  <div className="table-responsive text-center">
    <table className="table" id="stockTable">
      <thead className="thead-default">
        <tr>
          <th>Quantity</th>
          <th>Record date</th>
          <th>Added on</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { stocks.map((item, index) => (
          <tr key={index} id={item.id}>
            <td>{item.quantity}</td>
            <td>
              <Timestamp
                time={new Date(item.recordDate)}
                format="date" />
            </td>
            <td>
              <Timestamp
                time={item.createdAt}
                format="ago"
                precision={1} />
            </td>
            <td>
              <Button
                type="button"
                onClick={onDeleteModal}
                className="btn btn-sm btn-danger"
                icon="remove"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      type="button"
      className="btn btn-primary btn-sm mb-3">See more
    </button>
  </div>
);

StockList.propTypes = {
  stocks: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

export default StockList;
