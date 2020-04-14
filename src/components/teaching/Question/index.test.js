import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Question from './index.js';

afterEach(cleanup);

it('should take a snapshot', async () => {
    const question = {
        questionText: '1 + 1',
        options: [
            '1',
            '2',
            '3',
        ],
        answer: 1,
    };

    const { asFragment, getByText } = render(<Question editable={false} question={question} />);
    expect(asFragment()).toMatchSnapshot();
})