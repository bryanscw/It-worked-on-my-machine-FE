import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

export class ModalForm extends Component {
    handleSubmit = (...args) => {
        this.props.onSubmit(...args);
        this.props.onClose();
    }

    render() {
        const {
            title,
            isVisible,
            onClose,
            initialState,
            FormComponent
        } = this.props;

        return (
            <Modal
                title={title}
                isVisible={isVisible}
                onClose={onClose}>
                    <FormComponent onSubmit={this.handleSubmit} initialState={isVisible ? initialState : null} />
            </Modal>
        )
    }
}

ModalForm.propTypes = {
    title: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    /** The form component to display in the modal */
    FormComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]).isRequired,
    onClose: PropTypes.func.isRequired,
    /** The initial state of the form. If it's 'EMPTY', then the form will be empty. If it's an object, the form will display the form with initial state's content. */
    initialState: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** The function to call when the form is submitted */
    onSubmit: PropTypes.func.isRequired,
};

export default ModalForm;
