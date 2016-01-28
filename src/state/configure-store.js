import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import reduxThunk from 'redux-thunk';
import loggingMiddleware from '../middleware/logging-middleware';
import createHistory from 'history/lib/createBrowserHistory';
import * as reducers from './reducers';

// Combine all reducers into a single reducer for Redux to run
const reducer = combineReducers({
    router: routerStateReducer,
    ...reducers,
});

// Compose the store function with middleware. Returns a function that will
// instantiate the store.
const composeStoreWithMiddleware = compose(
    applyMiddleware(
        reduxThunk,
        loggingMiddleware,
    ),
    reduxReactRouter({ createHistory })
)(createStore);

export default function configureStore(initialState) {
    // Initialize the store with the top-level reducer function
    return composeStoreWithMiddleware(reducer, initialState);
}
