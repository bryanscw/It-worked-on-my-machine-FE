import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../redux/rootReducer';

export const withRedux = (component, initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )

    return {
        renderedComponent: <Provider store={store}>{component}</Provider>,
        store
    };
}

export const withRouter = (component, route = '/') => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return {
        renderedComponent: <Router history={history}>{component}</Router>,
        history
    };
}

export const withReduxRouter = (component, initialState = {}, route = '/') => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )
    const history = createMemoryHistory({ initialEntries: [route] });

    return {
        renderedComponent: (
            <Provider store={store}>
                <Router history={history}>{component}</Router>
            </Provider>
        ),
        history,
        store
    };
}