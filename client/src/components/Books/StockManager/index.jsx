import React from 'react';
import SearchStock from './SearchStock';

const StockManager = () => (
  <div>
    <h4 className="title mb-2 mr-4">Stock Manager</h4>
    <div className="mb-4"><small>Manage stock here</small></div>
    <SearchStock />
  </div>
);

export default StockManager;
