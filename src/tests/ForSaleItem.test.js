import React from 'react';
import ReactDOM from 'react-dom';
import ForsaleItemWithModal from '../ForsaleItem/ForsaleItem';

describe('ForSaleItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <ForsaleItemWithModal
        item={{
          id: 1003,
          item_name:
            "Putin's item name",
          item_body: '',
          item_is: 'unavailable',
          item_list: 1000,
          item_owner: 2,
          owner_name: 'Putin'
        }}
      />,
      div
    );
  });
});
