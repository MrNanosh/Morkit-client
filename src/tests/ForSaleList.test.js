import React from 'react';
import ReactDOM from 'react-dom';
import ForSaleList from '../ForSaleList/ForSaleList';

describe('ForSaleList', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <ForSaleList />,
      div
    );
  });
});
