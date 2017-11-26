import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';

const StockList = ({ stocks, onDeleteModal }) => (
  <div>
    {stocks.length !== 0 ? <div className="table-responsive text-center">
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
    </div> :
      <EmptyMessage absolute={false} />}
  </div>
);

StockList.propTypes = {
  stocks: PropTypes.array.isRequired,
  onDeleteModal: PropTypes.func.isRequired
};

export default StockList;
