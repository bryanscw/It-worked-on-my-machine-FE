import React from 'react'
import { render, cleanup } from '@testing-library/react'

import BasicCard from './index.js';
import { renderWithRouter } from '../../../utils/tests';

afterEach(cleanup);

it('should take a snapshot', async () => {
    const details = {
        title: 'Basic Addition',
        description: 'This is an interesting video',
    };

    const { asFragment } = renderWithRouter(<BasicCard editable={false} details={details} link="" />);
    expect(asFragment()).toMatchSnapshot();
})