import React from 'react';
import ReactDOM from 'react-dom';
import HasModal from '../HOCS/HasModal';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<HasModal />, div);
  });
});
