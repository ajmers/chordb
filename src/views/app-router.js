import React, { Component, PropTypes } from 'react';
import { ReduxRouter } from 'redux-router';
import { Route, Redirect } from 'react-router';
import AppWrapper from './app-wrapper';

export default class AppRouter extends Component {
    static propTypes = {
        store: PropTypes.shape({
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <ReduxRouter>
                <Route path='' component={AppWrapper}/>
                <Redirect from='*' to='' />
            </ReduxRouter>

        );
    }
}
