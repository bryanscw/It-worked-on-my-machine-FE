import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import DeleteForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<DeleteForm />);
    expect(asFragment()).toMatchSnapshot();
});

it('should return true if confirm', () => {
    var result;
    const { getByText } = render(<DeleteForm onSubmit={(formResult) => result = formResult} o/>);
    fireEvent.click(getByText(/confirm/i));
    expect(result).toBeTruthy();
});

it('should return false if cancel', () => {
    var result;
    const { getByText } = render(<DeleteForm onSubmit={(formResult) => result = formResult} />);
    fireEvent.click(getByText(/cancel/i));
    expect(result).toBeFalsy();
});