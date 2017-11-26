import React from 'react';
import List from './List';

const Histories = () => (
  <div>
    <h4 className="title mb-2 mr-4">My borrowing history</h4>
    <div className="mb-1">
      <small>I can view all my borrowing history here.</small>
    </div>
    <List />
  </div>
);

export default Histories;
