import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import LearningMaterialForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<LearningMaterialForm onSubmit={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
});

it('should return form data', () => {
    const expectedResult = {
        title: 'Basic Addition',
        description: 'This is an interesting video',
        link: 'https://www.youtube.com/embed/AQ7THUKx6Es'
    }

    var result;
    const { getByLabelText, getByText } = render(<LearningMaterialForm onSubmit={(formResult) => result = formResult}  />);

    fireEvent.change(getByLabelText(/title/i), {
        target: {value: expectedResult.title},
    })
    fireEvent.change(getByLabelText(/description/i), {
        target: {value: expectedResult.description},
    })
    fireEvent.change(getByLabelText(/link/i), {
        target: {value: expectedResult.link},
    })
    fireEvent.click(getByText(/submit/i));
    
    expect(result).toEqual(expectedResult);
});