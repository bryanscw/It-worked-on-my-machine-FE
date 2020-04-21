import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import axiosMock from 'axios';

import LoginPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
})

const delay = ms => new Promise(res => setTimeout(res, ms));

it('allows the user to login successfully', async () => {
    const dummyToken = {
        "access_token": "43e97d99-aed6-4602-8fc0-d52012550349",
        "token_type": "bearer",
        "refresh_token": "b6fe474b-3812-4406-b70a-4a569d77de19",
        "expires_in": 7199,
        "scope": "read write trust"
    }

    axiosMock.post.mockResolvedValueOnce({
        "data": dummyToken
    });
    axiosMock.post.mockResolvedValueOnce({
        "data": {
            "email": "admin1@test.com",
            "role": "ROLE_ADMIN",
            "name": "admin1"
        }
    });

    const { getByTestId } = renderWithReduxRouter(<LoginPage />);

    fireEvent.change(getByTestId("usernameField").querySelector('input'), {
        target: { value: 'admin1@test.com' },
    })
    fireEvent.change(getByTestId("passwordField").querySelector('input'), {
        target: { value: 'admin123' },
    })
    fireEvent.click(getByTestId("loginButton"));

    await delay(1000);

    expect(localStorage.getItem('access_token')).toEqual(dummyToken.access_token);
    expect(localStorage.getItem('refresh_token')).toEqual(dummyToken.refresh_token);
    expect(parseInt(localStorage.getItem('expires_in'))).toEqual(parseInt(dummyToken.expires_in));

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
})

it('reject user login with wrong password', async () => {
    axiosMock.post.mockRejectedValueOnce();

    const { getByTestId } = renderWithReduxRouter(<LoginPage />);

    fireEvent.change(getByTestId("usernameField").querySelector('input'), {
        target: { value: 'admin1@test.com' },
    })
    fireEvent.change(getByTestId("passwordField").querySelector('input'), {
        target: { value: 'wrong password' },
    })
    fireEvent.click(getByTestId("loginButton"));

    await delay(1000);

    expect(localStorage.getItem('access_token')).toEqual(null)
    expect(localStorage.getItem('refresh_token')).toEqual(null)
    expect(localStorage.getItem('expires_in')).toEqual(null)
})

