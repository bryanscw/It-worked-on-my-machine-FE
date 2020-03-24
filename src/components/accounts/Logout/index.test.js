import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Logout from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<Logout />);
    expect(asFragment()).toMatchSnapshot();
})
