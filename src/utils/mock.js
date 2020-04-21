import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const authReducer = {
    user: {
        email: "test@test.com"
    },
    access_token: "123",
}

export const withRedux = (component, initialState = {}) => {
    const store = createStore(
        (state = {}, action) => state,
        {
            ...initialState,
            authReducer
        },
        applyMiddleware(thunk),
    )

    return <Provider store={store}>{component}</Provider>;
}

export const withRouter = (component, route = '/') => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return <Router history={history}>{component}</Router>;
}

export const withReduxRouter = (component, initialState = {}, route = '/') => {
    const store = createStore(
        (state = {}, action) => state,
        {
            ...initialState,
            authReducer
        },
        applyMiddleware(thunk),
    )
    const history = createMemoryHistory({ initialEntries: [route] });

    return (
        <Provider store={store}>
            <Router history={history}>{component}</Router>
        </Provider>
    );
}