import React from 'react'
import { render, cleanup } from '@testing-library/react'

import LearningMaterial from './index.js';

afterEach(cleanup);

it('should take a snapshot', async () => {
    const learningMaterial = {
        title: 'Basic Addition',
        description: 'This is an interesting video',
        link: 'https://www.youtube.com/embed/AQ7THUKx6Es',
    };

    const { asFragment } = render(<LearningMaterial editable={false} learningMaterial={learningMaterial} />);
    expect(asFragment()).toMatchSnapshot();
})