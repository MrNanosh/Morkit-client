import React from 'react';
import ReactDOM from 'react-dom';
import HelpText from '../HelpText/HelpText';

describe('InventoryItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(<HelpText />, div);
  });
});
