import React from 'react';
import ReactDOM from 'react-dom';
import MessageMain from '../MessageMain/MessageMain';

describe('MessageMain', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <MessageMain />,
      div
    );
  });
});
