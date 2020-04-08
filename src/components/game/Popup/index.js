import React from "react";
import "./styles.css";
import { PropTypes } from 'prop-types';

/**
 * This component displays an in-game popup for user.
 */
class Popup extends React.Component {
    render() {
        return (
            <div className="popup" data-testid="POPUP">
                <div className="popup_inner" data-testid="POPUP_INNER">
                    <h1 data-testid="TEXT">{this.props.text}</h1>
                    <button onClick={this.props.closePopup} data-testid="BUTTON">close me</button>
                </div>
            </div>
        );
    }
}
Popup.propTypes = {
    /** A string containing the popup text */
    text: PropTypes.string.isRequired,
    /** An action creator for closing the popup */
    closePopup: PropTypes.func.isRequired
};

export default Popup;
