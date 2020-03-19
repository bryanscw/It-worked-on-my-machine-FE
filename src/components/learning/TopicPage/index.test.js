import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import { renderWithReduxRouter } from '../../../utils/tests.js';
import TopicPage from './index.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({
        data: {
            id: 1,
            title: "Addition",
            description: "Putting 2 and 2 together.",
        }
    });

    axiosMock.get.mockResolvedValueOnce({
        data: {
            content: [
                {
                    id: 1,
                    title: "Adding 1 to 100",
                    description: "Smol numbers.",
                    playable: true,
                },
                {
                    id: 2,
                    title: "Adding 1 to 1000",
                    description: "Big numbers.",
                    playable: false,
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const matchObject = {
    params: {
        topicId: 1
    }
}

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<TopicPage match={matchObject} />);
    await waitForElement(() => getByText('Levels'));
    expect(asFragment()).toMatchSnapshot();
})

it('should load levels', () => {
    const { getByTestId } = renderWithReduxRouter(<TopicPage match={matchObject} />); 
    expect(getByTestId('loader')).toBeTruthy();
});

it('should load and display the levels', async () => {
    const { getByText } = renderWithReduxRouter(<TopicPage match={matchObject} />);
    const levels = await waitForElement(() => getByText('Levels'));
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(levels).toBeTruthy();
})

it('should not display unplayable levels', async () => {
    const { getByText, queryByText } = renderWithReduxRouter(<TopicPage match={matchObject} />);
    const playableLevel = await waitForElement(() => getByText('Adding 1 to 100'));
    expect(playableLevel).toBeTruthy();
    const unplayableLevel = queryByText('Adding 1 to 1000');
    expect(unplayableLevel).toBeFalsy();
})

it('should not display edit or delete buttons', async () => {
    const { getByText, container } = renderWithReduxRouter(<TopicPage match={matchObject} />);
    
    await waitForElement(() => getByText('Levels'));
    
    const editButton = container.querySelector('[data-icon="edit"]');
    expect(editButton).toBeFalsy();

    const deleteButton = container.querySelector('[data-icon="trash"]');
    expect(deleteButton).toBeFalsy();
});