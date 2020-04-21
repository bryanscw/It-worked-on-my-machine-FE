import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';

import rootReducer from '../redux/rootReducer';

export const renderWithRedux = (component, initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )

    const renderedComponent = <Provider store={store}>{component}</Provider>;

    return {
        ...render(renderedComponent),
        store
    };
}

export const renderWithRouter = (component, route = '/') => {
    const history = createMemoryHistory({ initialEntries: [route] });
    const renderedComponent = <Router history={history}>{component}</Router>;

    return {
        ...render(renderedComponent),
        history
    };
}

export const renderWithReduxRouter = (component, initialState = {}, route = '/') => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )
    const history = createMemoryHistory({ initialEntries: [route] });
    
    const renderedComponent = (
        <Provider store={store}>
            <Router history={history}>{component}</Router>
        </Provider>
    );

    return {
        ...render(renderedComponent),
        history,
        store
    };
}