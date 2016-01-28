/*
     This is the entry point for the application.
     It instantiates the application store and renders the Redux provider and
     application router.
 */
import 'babel-polyfill';

/* React and Redux */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state/configure-store';

/* Application-Specific */
import { AppRouter } from './views';
import './assets/styles/styles.scss';

// Creates the top-level application store
const store = configureStore();

// Renders the application to the DOM
ReactDOM.render(
    <Provider store={store}>
        <AppRouter store={store} />
    </Provider>,
    document.getElementById('app-wrapper')
);
