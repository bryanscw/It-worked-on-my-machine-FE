import React from 'react'
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react'
import ModalForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(
        <ModalForm
            title="Modal title"
            onClose={() => {}}
            onSubmit={() => {}}
            initialState={{}}
            isVisible={true}
            FormComponent={() => <p>Modal body</p>}
            />
    );
    expect(asFragment()).toMatchSnapshot();
})

it('should hide modal the close button is clicked', async () => {
    const { getByText, getByTestId } = render(
        <ModalForm
            title="Modal title2"
            onClose={() => {}}
            onSubmit={() => {}}
            initialState={{}}
            isVisible={true}
            FormComponent={() => <p>Modal body</p>}
            />
    );

    const modal = getByTestId("modal");
    expect(modal).toBeVisible();

    fireEvent.click(getByText('×'));
    await waitForDomChange(() => expect(modal).not.toBeVisible());
})