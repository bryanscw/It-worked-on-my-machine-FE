import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import LeaderboardPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: [
            {
                name: "Bob",
                timing: 1.2,
            },
            {
                name: "Joe",
                timing: 1.5,
            },
            {
                name: "Kelly",
                timing: 2.0,
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
    const { asFragment, getByText } = renderWithReduxRouter(<LeaderboardPage match={matchObject} />); 
    await waitForElement(() => getByText('Leaderboard'));
    expect(asFragment()).toMatchSnapshot();
});