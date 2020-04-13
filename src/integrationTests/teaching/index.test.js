import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react/pure'
import axiosMock from 'axios';

import tokenJson from './json/token.json';
import userJson from './json/user.json';
import topicsJson from './json/topics.json';
import topicJson from './json/topic.json';
import levelsJson from './json/levels.json';
import levelJson from './json/level.json';
import learningMaterialsJson from './json/learningMaterials.json';
import questionJson from './json/questions.json';
import studentsReportsJson from './json/studentReports.json';
import App from '../../components/common/App';

jest.mock('axios');

afterEach(jest.clearAllMocks);

describe('Integration test for teaching platform', () => {
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
        axiosMock.get.mockResolvedValueOnce(topicsJson);

        const { getByLabelText, getByText } = container;

        const loginDetails = {
            username: 'teacher1@test.com',
            password: 'teacher123',
        }

        fireEvent.change(getByLabelText(/username/i), {
            target: {value: loginDetails.username},
        })
        fireEvent.change(getByLabelText(/password/i), {
            target: {value: loginDetails.password},
        })
        fireEvent.click(getByText(/login/i).closest('button'));

        const topics = await waitForElement(() => getByText(/topics/i));
        const addition = await waitForElement(() => getByText(/addition/i));

        expect(topics).toBeVisible();
        expect(addition).toBeVisible();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });

    it('should be able to click a topic', async done => {
        axiosMock.get.mockImplementation(url => {
            if (/gameMaps/.test(url))
                return Promise.resolve(levelsJson);
            else
                return Promise.resolve(topicJson);
        });
        axiosMock.get.mockResolvedValueOnce(topicJson);
        axiosMock.get.mockResolvedValueOnce(levelsJson);

        const { getByText } = container;

        fireEvent.click(getByText(/addition/i).closest('a'));
        
        const topic = await waitForElement(() => getByText(/addition from 1 to 1000/i));

        expect(topic).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(2);
        done();
    });

    it('should be able to click a level', async done => {
        axiosMock.get.mockImplementation(url => {
            if (/topics/.test(url))
                return Promise.resolve(levelJson);
            else if (/learningMaterials/.test(url))
                return Promise.resolve(learningMaterialsJson);
            else if (/questions/.test(url))
                return Promise.resolve(questionJson);
        });

        const { getByText } = container;

        fireEvent.click(getByText(/addition from 1 to 1000/i).closest('a'));
        
        const learningMaterials = await waitForElement(() => getByText(/learning materials/i));
        const questions = await waitForElement(() => getByText(/questions/i));

        expect(learningMaterials).toBeVisible();
        expect(questions).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(3);
        done();
    });

    it('should be able to click view student reports', async done => {
        axiosMock.get.mockResolvedValueOnce(studentsReportsJson);

        const { getByText } = container;

        fireEvent.click(getByText(/view student reports/i).closest('a'));
        
        const studentReports = await waitForElement(() => getByText(/student reports/i));

        expect(studentReports).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });
});