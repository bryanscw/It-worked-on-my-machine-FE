import React from 'react'
import { render, cleanup } from '@testing-library/react'
import QuestionForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<QuestionForm />);
    expect(asFragment()).toMatchSnapshot();
});