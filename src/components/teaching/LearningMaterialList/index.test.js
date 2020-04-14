import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import LearningMaterialList from './index.js';
import { renderWithRedux } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: {
            content: [
                {
                    id: 1,
                    title: 'Basic Addition',
                    description: 'This is an interesting video',
                    link: 'https://www.youtube.com/embed/AQ7THUKx6Es',
                },
                {
                    id: 2,
                    title: 'Basic Subtraction',
                    description: 'This is an interesting video',
                    link: 'https://www.youtube.com/embed/AQ7THUKx6Es',
                },
            ]
        }
    });
});

afterEach(cleanup);

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithRedux(<LearningMaterialList levelId={1} editable={true} />);
    await waitForElement(() => getByText('Basic Addition'));
    expect(asFragment()).toMatchSnapshot();
})