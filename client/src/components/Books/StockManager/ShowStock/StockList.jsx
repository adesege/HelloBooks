import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';

const StockList = ({ stocks, onDeleteModal }) => (
  <div className="table-responsive text-center">
    <table className="table" id="stockTable">
      <thead className="thead-default">
        <tr>
          <th>Quantity</th>
          <th>Added on</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { stocks.map((item, index) => (
          <tr key={index}>
            <td>{item.quantity}</td>
            <td>
              <Timestamp
                time={item.createdAt}
                format="ago"
                precision={1} />
            </td>
            <td>
              <i className="btn btn-sm btn-danger fa fa-remove" id={item.id} onClick={onDeleteModal} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

StockList.propTypes = {
  stocks: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

export default StockList;
