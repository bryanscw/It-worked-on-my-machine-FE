import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react/pure'
import axiosMock from 'axios';

import tokenJson from './json/token.json';
import userJson from './json/user.json';
import usersJson from './json/users.json';
import App from '../../components/common/App';

jest.mock('axios');

afterEach(jest.clearAllMocks);

describe('Integration test for system administrators', () => {
    let container;

    beforeAll(() => {
        container = render(<App />);
    });

    it('should display login page', async done => {
        const { getByText } = container;
        const login = await waitForElement(() => getByText(/login/i));
        expect(login).toBeVisible();
        done();
    })

    it('should be able to login', async done => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: true, json: () => tokenJson}));
        axiosMock.post.mockResolvedValueOnce(userJson);
        axiosMock.get.mockResolvedValueOnce(usersJson);

        const { getByLabelText, getByText } = container;

        const loginDetails = {
            username: 'admin1@test.com',
            password: 'admin123',
        }

        fireEvent.change(getByLabelText(/username/i), {
            target: {value: loginDetails.username},
        })
        fireEvent.change(getByLabelText(/password/i), {
            target: {value: loginDetails.password},
        })
        fireEvent.click(getByText(/login/i).closest('button'));

        const admin1 = await waitForElement(() => getByText(/admin1@test.com/i));

        expect(admin1).toBeVisible();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });

    it('should be able to logout', async done => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ok: true, json: () => ({})}));

        const { getByText } = container;

        fireEvent.click(getByText(/logout/i).closest('a'));

        const loginButton = await waitForElement(() => getByText(/login/i).closest('a'));
        fireEvent.click(loginButton);
        
        const login = await waitForElement(() => getByText(/login/i));

        expect(login).toBeVisible();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        done();
    });
});