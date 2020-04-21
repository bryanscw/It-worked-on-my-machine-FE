import React from 'react';
import axiosMock from 'axios';
import { cleanup, waitForElement } from '@testing-library/react';

import AdminPage from './index';
import { renderWithReduxRouter } from '../../../utils/tests';

jest.mock("axios");

beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({
        "data": {
            "content": [
                {
                    name: "Bob",
                    email: "bob@test.com",
                    role:"ROLE_STUDENT"
                },
                {
                    name: "Sam",
                    email: "sam@test.com",
                    role:"ROLE_TEACHER"
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<AdminPage />);
    expect(asFragment()).toMatchSnapshot();
})

it('Should load users', async () => {
    const { getByText } = renderWithReduxRouter(<AdminPage />);
    const userEmail = await waitForElement(() => getByText('bob@test.com'));
    expect(userEmail).toBeTruthy();
});