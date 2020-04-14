// ACTION TYPES
const ERROR_DISPLAY = 'ERROR_DISPLAY';
const ERROR_CLOSE = 'ERROR_CLOSE';

// REDUCER
const initialState = {
    errors: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ERROR_DISPLAY:
            return {
                ...state,
                errors: [...state.errors, action.payload],
            }

        case ERROR_CLOSE:
            return {
                ...state,
                errors: state.errors.map(error => {
                    if (error.id === action.payload)
                        return {
                            ...error,
                            isVisible: false,
                        };
                    else
                        return error;
                }),
            }

        default:
            return state;
    }
};

// ACTION CREATORS
function displayErrorAction(error) {
    // Generate unique ID
    return {
        type: ERROR_DISPLAY,
        payload: error,
    }
}

function closeErrorAction(id) {
    return {
        type: ERROR_CLOSE,
        payload: id,
    }
}

// OPERATIONS
export const displayError = errorMessage => dispatch => {
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    dispatch(displayErrorAction({
        id: uid,
        message: errorMessage,
        isVisible: true,
    }));

    // Dismiss error alert after 3 seconds
    setTimeout(() => {
        dispatch(closeErrorAction(uid));
    }, 3000);
};

export const closeError = id => dispatch => dispatch(closeErrorAction(id));

// SELECTORS
export const selectErrors = state => state.errorsReducer.errors;