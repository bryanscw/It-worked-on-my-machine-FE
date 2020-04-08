import { withRedux, withRouter, withReduxRouter } from './mock';
import { render } from '@testing-library/react';

export const renderWithRedux = (component, initialState = {}) => {
    const {
        renderedComponent,
        store,
    } = withRedux(component, initialState);

    return {
        ...render(renderedComponent),
        store
    };
}

export const renderWithRouter = (component, route = '/') => {
    const {
        renderedComponent,
        history,
    } = withRouter(component, route);

    return {
        ...render(renderedComponent),
        history
    };
}

export const renderWithReduxRouter = (component, initialState = {}, route = '/') => {
    const {
        renderedComponent,
        history,
        store,
    } = withReduxRouter(component, initialState, route);

    return {
        ...render(renderedComponent),
        history,
        store
    };
}