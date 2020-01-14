import React from 'react';
import ReactDOM from 'react-dom';
import InventoryItem from '../InventoryItem/InventoryItem';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <InventoryItem />,
      div
    );
  });
});
