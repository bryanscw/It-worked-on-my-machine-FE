import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import { renderWithReduxRouter } from '../../../utils/tests.js';
import TeachingHomePage from './index.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: {
            content: [
                {
                    id: 1,
                    title: "Addition",
                    description: "Putting 2 and 2 together."
                },
                {
                    id: 2,
                    title: "Subtraction",
                    description: "Removing one from another."
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('should load topics', () => {
    const { getByTestId } = renderWithReduxRouter(<TeachingHomePage />); 
    expect(getByTestId('loader')).toBeTruthy();
});

it('should load and display the topics', async () => {
    const { getByText } = renderWithReduxRouter(<TeachingHomePage />,{
        authReducer: {
            user: {
                name: 'Bob'
            }
        }
    });

    const welcome = await waitForElement(() => getByText('Welcome Bob!'));
    expect(welcome).toBeTruthy();

    const topics = await waitForElement(() => getByText('Topics'));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(topics).toBeTruthy();
})

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<TeachingHomePage />);
    await waitForElement(() => getByText('Topics'));
    expect(asFragment()).toMatchSnapshot();
})

it('should display edit or delete buttons', async () => {
    const { getByText, container } = renderWithReduxRouter(<TeachingHomePage />);
    
    await waitForElement(() => getByText('Topics'));
    
    const editButton = await waitForElement(() => container.querySelector('[data-icon="edit"]'));
    expect(editButton).toBeTruthy();

    const deleteButton = await waitForElement(() => container.querySelector('[data-icon="trash"]'));
    expect(deleteButton).toBeTruthy();
});