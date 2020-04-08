// ACTION TYPES
const ERROR_DISPLAY = 'ERROR_DISPLAY';
const ERROR_CLOSE = 'ERROR_CLOSE';

// REDUCER
const initialState = {
    isVisible: false,
    errorMessage: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ERROR_DISPLAY:
            return {
                ...state,
                isVisible: true,
                errorMessage: action.payload,
            }

        case ERROR_CLOSE:
            return {
                ...state,
                isVisible: false,
            }

        default:
            return state;
    }
};

// ACTION CREATORS
export function displayErrorAction(errorMessage) {
    return {
        type: ERROR_DISPLAY,
        payload: errorMessage
    }
}

export function closeErrorAction() {
    return {
        type: ERROR_CLOSE,
    }
}

// OPERATIONS
export const displayError = errorMessage => dispatch => {
    dispatch(displayErrorAction(errorMessage));

    // Dismiss error alert after 3 seconds
    setTimeout(() => {
        dispatch(closeErrorAction());
    }, 3000);
};

export const closeError = () => dispatch => dispatch(closeErrorAction());

// SELECTORS
export const selectIsVisible = state => state.errorsReducer.isVisible;
export const selectErrorMessage = state => state.errorsReducer.errorMessage;