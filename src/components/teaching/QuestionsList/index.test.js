import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import QuestionForm from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: {
            content: [
                {
                    id: 1,
                    questionText: "1 + 1",
                    options: {
                        '0': 1,
                        '1': 2,
                    },
                    answer: 1,
                },
                {
                    id: 2,
                    questionText: "1 + 2",
                    options: {
                        '0': 1,
                        '1': 2,
                        '2': 3,
                    },
                    answer: 2,
                },
            ]
        }
    });
});

afterEach(cleanup);

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<QuestionForm levelId={1} playable={false} />);
    await waitForElement(() => getByText('1 + 1'));
    expect(asFragment()).toMatchSnapshot();
})