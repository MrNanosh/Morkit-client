import React from 'react';
import ReactDOM from 'react-dom';
import hasModal from '../HOCS/hasModal';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<hasModal />, div);
  });
});
