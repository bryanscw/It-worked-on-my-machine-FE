import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import { renderWithReduxRouter } from '../../../utils/tests.js';
import LevelPage from './index.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
        if (/topics/.test(url)) {
            return Promise.resolve({
                data: {
                    id: 1,
                    title: "Adding 1 to 100",
                    description: "Smol numbers.",
                    playable: true,
                    topic_id: 1
                }
            });

        } else if (/learningMaterials/.test(url)) {
            return Promise.resolve({
                data: {
                    content: [
                        {
                            id: 1,
                            title: "Basic addition",
                            description: "Interesting video",
                            link: "https://www.youtube.com/embed/Fe8u2I3vmHU",
                        }
                    ]
                }
            });

        } else if (/questions/.test(url)) {
            return Promise.resolve({
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
                        }
                    ]
                }
            });
        }

        return Promise.reject(new Error('not found'));
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const matchObject = {
    params: {
        topicId: 1,
        levelId: 1,
    }
}

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<LevelPage match={matchObject} />);
    await waitForElement(() => getByText('Learning Material'));
    await waitForElement(() => getByText('Questions'));
    expect(asFragment()).toMatchSnapshot();
})

it('should load learning material and questions', () => {
    const { getByTestId } = renderWithReduxRouter(<LevelPage match={matchObject} />); 
    expect(getByTestId('loader')).toBeTruthy();
});

it('should load and display the learning material and questions', async () => {
    const { getByText } = renderWithReduxRouter(<LevelPage match={matchObject} />);
    const learningMaterial = await waitForElement(() => getByText('Learning Material'));
    const questions = await waitForElement(() => getByText('Questions'));
    expect(axiosMock.get).toHaveBeenCalledTimes(3);
    expect(learningMaterial).toBeTruthy();
    expect(questions).toBeTruthy();
})

it('should not display edit or delete buttons and should display view student reports if playable', async () => {
    const { getByText, container } = renderWithReduxRouter(<LevelPage match={matchObject} />);
    
    await waitForElement(() => getByText('Learning Material'));
    await waitForElement(() => getByText('Questions'));
    
    const editButton = container.querySelector('[data-icon="edit"]');
    expect(editButton).toBeFalsy();

    const deleteButton = container.querySelector('[data-icon="trash"]');
    expect(deleteButton).toBeFalsy();

    const viewStudentReports = await waitForElement(() => getByText('View Student Reports'));
    expect(viewStudentReports).toBeTruthy();
});

it('should display edit or delete buttons if unplayable', async () => {
    axiosMock.get.mockImplementation((url) => {
        if (/topics/.test(url)) {
            return Promise.resolve({
                data: {
                    id: 1,
                    title: "Adding 1 to 100",
                    description: "Smol numbers.",
                    playable: false,
                    topic_id: 1
                }
            });

        } else if (/learningMaterials/.test(url)) {
            return Promise.resolve({
                data: {
                    content: [
                        {
                            id: 1,
                            title: "Basic addition",
                            description: "Interesting video",
                            link: "https://www.youtube.com/embed/Fe8u2I3vmHU",
                        }
                    ]
                }
            });

        } else if (/questions/.test(url)) {
            return Promise.resolve({
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
                        }
                    ]
                }
            });
        }

        return Promise.reject(new Error('not found'));
    });
    
    const { getByText, container, queryByText } = renderWithReduxRouter(<LevelPage match={matchObject} />);
    
    await waitForElement(() => getByText('Learning Material'));
    await waitForElement(() => getByText('Questions'));
    
    const editButton = await waitForElement(() => container.querySelector('[data-icon="edit"]'));
    expect(editButton).toBeTruthy();

    const deleteButton = await waitForElement(() => container.querySelector('[data-icon="trash"]'));
    expect(deleteButton).toBeTruthy();

    const publishLevel = queryByText('Publish Level');
    expect(publishLevel).toBeTruthy();

    const viewStudentReports = queryByText('View Student Reports');
    expect(viewStudentReports).toBeFalsy();
});