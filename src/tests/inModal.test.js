import React from 'react';
import ReactDOM from 'react-dom';
import inModal from '../HOCS/inModal';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<inModal />, div);
  });
});
