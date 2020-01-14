import React from 'react';
import InventoryList from '../InventoryList/InventoryList';
import ReactDOM from 'react-dom';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <InventoryList />,
      div
    );
  });
});
