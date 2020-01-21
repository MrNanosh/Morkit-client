import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faChevronLeft,
  faTrashAlt,
  faCheckDouble,
  faBoxes,
  faListAlt,
  faInbox,
  faChevronCircleDown,
  faChevronCircleRight,
  faBreadSlice
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faPlus,
  faChevronCircleDown,
  faChevronCircleRight,
  faListAlt,
  faBoxes,
  faChevronLeft,
  faTrashAlt,
  faCheckDouble,
  faInbox,
  faBreadSlice
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
