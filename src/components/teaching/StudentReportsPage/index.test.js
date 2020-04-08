import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import StudentReportsPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: [
            {
                question: {
                    questionText: "1 + 1"
                },
                attempts: [
                    {
                        user: {
                            name: "Bob"
                        },
                        attemptCount: 1
                    },
                    {
                        user: {
                            name: "Joe"
                        },
                        attemptCount: 2
                    },
                    {
                        user: {
                            name: "Kelly"
                        },
                        attemptCount: 1
                    },
                ],
            },
            {
                question: {
                    questionText: "1 + 3"
                },
                attempts: [
                    {
                        user: {
                            name: "Bob"
                        },
                        attemptCount: 4
                    },
                    {
                        user: {
                            name: "Joe"
                        },
                        attemptCount: 3
                    },
                    {
                        user: {
                            name: "Kelly"
                        },
                        attemptCount: 3
                    },
                ],
            },
        ]
    });
});

afterEach(cleanup);

const matchObject = {
    params: {
        topicId: 1,
        levelId: 1,
    }
}

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<StudentReportsPage match={matchObject} />); 
    await waitForElement(() => getByText('Student Reports'));
    expect(asFragment()).toMatchSnapshot();
});