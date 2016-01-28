import React, { Component, PropTypes } from 'react';
import { ReduxRouter } from 'redux-router';
import { Route, Redirect } from 'react-router';
import AppWrapper from './app-wrapper';

export default class AppRouter extends Component {
    render() {
        return (
            <ReduxRouter>
                <Route path='/' component={AppWrapper}/>
                <Redirect from='*' to='/' />
            </ReduxRouter>
        );
    }
}
