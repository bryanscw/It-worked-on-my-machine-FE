import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';

export class Modal extends Component {
    componentDidMount() {
        this.updateModal();
        $(this.modalRef).on('hidden.bs.modal', e => this.props.isVisible && this.props.onClose());
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.isVisible !== prevProps.isVisible) {
            this.updateModal();
        }
    }

    updateModal() {
        if (this.props.isVisible)
            $(this.modalRef).modal('show');
        else {
            $(this.modalRef).modal('hide');
        }
    }

    render() {
        const {
            title,
            children,
            onClose,
        } = this.props;

        return (
            <div className="modal fade" ref={modalRef => this.modalRef = modalRef} tabIndex="-1" data-testid="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal
