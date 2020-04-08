import React from 'react'
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react'
import Modal from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(
        <Modal
            title="Modal title"
            onClose={() => {}}
            isVisible={true}>
            <p>Modal body</p>
        </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
})

it('should hide modal the close button is clicked', async () => {
    const { getByText, getByTestId } = render(
        <Modal
            title="Modal title"
            onClose={() => {}}
            isVisible={true}>
            <p>Modal body</p>
        </Modal>
    );

    const modal = getByTestId("modal");
    expect(modal).toBeVisible();

    fireEvent.click(getByText('×'));
    await waitForDomChange(() => expect(modal).not.toBeVisible());
})