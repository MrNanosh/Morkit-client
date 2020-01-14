import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import { BrowserRouter } from 'react-router-dom';

describe('MessageMain', () => {
  it('renders without crashing', () => {
    const div = document.createElement(
      'div'
    );
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      div
    );
  });
});
