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
        const { getByTestId } = container;
        const login = await waitForElement(() => getByTestId("loginButton"));
        expect(login).toBeVisible();
        done();
    })

    it('should be able to login', async done => {
        axiosMock.post.mockResolvedValueOnce(tokenJson);
        axiosMock.post.mockResolvedValueOnce(userJson);
        axiosMock.get.mockResolvedValueOnce(usersJson);

        const { getByLabelText, getByText, getByTestId } = container;

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
        fireEvent.click(getByTestId("loginButton"));

        const admin1 = await waitForElement(() => getByText(/admin1@test.com/i));

        expect(admin1).toBeVisible();

        expect(axiosMock.post).toHaveBeenCalledTimes(2);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });

    it('should be able to logout', async done => {
        axiosMock.delete.mockResolvedValueOnce({});

        const { getByText, getByTestId } = container;

        fireEvent.click(getByText(/logout/i).closest('a'));

        const loginLink = await waitForElement(() => getByText(/login/i).closest('a'));
        fireEvent.click(loginLink);
        
        const loginButton = await waitForElement(() => getByTestId("loginButton"));

        expect(loginButton).toBeVisible();

        expect(axiosMock.delete).toHaveBeenCalledTimes(1);
        done();
    });
});