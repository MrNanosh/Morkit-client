import React from 'react';
import ReactDOM from 'react-dom';
import InventoryMain from '../InventoryMain/InventoryMain';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <InventoryMain />,
      div
    );
  });
});
