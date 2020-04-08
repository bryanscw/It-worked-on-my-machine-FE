import React from 'react'
import { render, cleanup } from '@testing-library/react'
import LoginPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
})
