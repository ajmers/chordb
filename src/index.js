import ReactDOM from 'react-dom';
import Root from './root';
import { createHistory } from 'history';

// Import required so that React is available even
// though it is not used in this file
import React from 'react';

ReactDOM.render(
  <Root history={ createHistory() } />,
  document.getElementById('app-wrapper')
);
