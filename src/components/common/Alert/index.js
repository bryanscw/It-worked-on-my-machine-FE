import React, { Component } from 'react'
import { connect } from 'react-redux';

import { closeError, selectErrorMessage, selectIsVisible } from '../../../redux/ducks/errors';
import './styles.css';
/**
 * This component displays alerts when there is an error.
 */
export class Alert extends Component {
    render() {
        const {
            isVisible,
            errorMessage,
        } = this.props;

        return (
            <div className={`alert alert-danger ${isVisible ? 'alert-shown' : 'alert-hidden'}`} ref={alert => this.alert = alert}>
                <strong>Error:</strong> {errorMessage}
                <button type="button" className="close" onClick={this.props.closeError}>
                    <span>&times;</span>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isVisible: selectIsVisible(state),
    errorMessage: selectErrorMessage(state),
});

const dispatchers = {
    closeError,
};

export default connect(mapStateToProps, dispatchers)(Alert);
