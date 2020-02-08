import React from 'react';
import ReactDOM from 'react-dom';
import InModal from '../HOCS/InModal';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<InModal />, div);
  });
});
