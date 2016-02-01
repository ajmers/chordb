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
import AppWrapper from './views/app-wrapper';

// Creates the top-level application store
const store = configureStore();
// Renders the application to the DOM
ReactDOM.render(
    <Provider store={store}>
        <AppWrapper store={store}/>
    </Provider>,
    document.getElementById('app-wrapper')
);
