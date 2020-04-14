import React from 'react'
import { cleanup, wait, fireEvent } from '@testing-library/react'
import Errors from './index.js';
import { renderWithRedux } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithRedux(<Errors />, {
        errorsReducer: {
            errors: [
                {
                    id: 1,
                    message: 'Error message 1',
                    isVisible: true,
                },
                {
                    id: 2,
                    message: 'Error message 2',
                    isVisible: true,
                },
                {
                    id: 3,
                    message: 'Error message 3',
                    isVisible: false,
                },
            ]
        }
    });

    expect(asFragment()).toMatchSnapshot();
});

it('should show error message if isVisible is true', () => {
    const { getByText } = renderWithRedux(<Errors />, {
        errorsReducer: {
            errors: [
                {
                    id: 1,
                    message: 'Error message',
                    isVisible: true,
                },
            ]
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).toBeVisible;
})


it('should hide error message if isVisible is false', () => {
    const { getByText } = renderWithRedux(<Errors />, {
        errorsReducer: {
            errors: [
                {
                    id: 1,
                    message: 'Error message',
                    isVisible: false,
                },
            ]
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).not.toBeVisible;
})

it('should hide the Errors the close button is clicked', async () => {
    const { getByText } = renderWithRedux(<Errors />, {
        errorsReducer: {
            errors: [
                {
                    id: 1,
                    message: 'Error message',
                    isVisible: true,
                },
            ]
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).toBeVisible;

    fireEvent.click(getByText('×'));
    await wait(() => expect(errorMessage).not.toBeVisible);
})