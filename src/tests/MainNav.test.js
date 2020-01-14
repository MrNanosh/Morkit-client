import React from 'react';
import ReactDOM from 'react-dom';
import MainNav from '../MainNav/MainNav';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<MainNav />, div);
  });
});
