import axios from 'axios';
import { combineReducers } from 'redux';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig, getUser } from './authHelper';

const ENTITY_NAME = 'progress';

// REDUCER
const ADDITIONAL_METHODS = {
    ANSWER: 'ANSWER',
    LEADERBOARD: 'LEADERBOARD',
    REPORT: 'REPORT',
}

const initialState = {
    isLoading: {
        [ADDITIONAL_METHODS.ANSWER]: true,
        [ADDITIONAL_METHODS.LEADERBOARD]: true,
        [ADDITIONAL_METHODS.REPORT]: true,
    },
    hasFailed: {},
    answerResult: {
        question: null,
        isCorrect: null,
    },
    leaderboard: [],
    report: [],
};

// For submit answer, fetch leaderboard and fetch report (not part of the normal CRUDL API calls)
function additionalReducer(state = initialState, action) {
    const actionTypePattern = /(.+)_(.+)_(.+)/;
    const match = action.type.match(actionTypePattern);

    if (!match)
        return state;

    const actionEntityName = match[1];
    const actionStatus = match[2];
    const actionMethod = match[3];

    if (actionEntityName !== ENTITY_NAME.toUpperCase() || !Object.values(ADDITIONAL_METHODS).includes(actionMethod))
        return state;

    switch (actionStatus) {
        case STATUSES.REQUEST:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    [actionMethod]: true
                },
                hasFailed: {
                    ...state.isLoading,
                    [actionMethod]: false
                },
            };

        case STATUSES.SUCCESS:
            switch (actionMethod) {
                case ADDITIONAL_METHODS.ANSWER:
                    return {
                        ...state,
                        isLoading: {
                            ...state.isLoading,
                            [actionMethod]: false
                        },
                        answerResult: action.payload,
                    }

                case ADDITIONAL_METHODS.LEADERBOARD:
                    return {
                        ...state,
                        isLoading: {
                            ...state.isLoading,
                            [actionMethod]: false
                        },
                        leaderboard: action.payload,
                    }
                    
                case ADDITIONAL_METHODS.REPORT:
                    return {
                        ...state,
                        isLoading: {
                            ...state.isLoading,
                            [actionMethod]: false
                        },
                        report: action.payload,
                    }
                
                default:
                    return state;
            }
        
        case STATUSES.FAILURE:
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    [actionMethod]: false
                },
                hasFailed: {
                    ...state.isLoading,
                    [actionMethod]: true
                },
            };

        default:
            return state;
    }
};

const progressReducer = combineReducers({
    crudlReducer: createApiReducer(ENTITY_NAME),
    additionalReducer,
});

export default progressReducer;

// OPERATIONS
export const createProgress = (gameMapId, progress) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));
    const user = getUser(getState);

    axios
        .post(
            `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/`,
            progress,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayError("Unable to create progress")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveProgress = gameMapId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
    const user = getUser(getState);

    axios
        .get(
            `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, null));
            } else {
                displayError("Unable to retrieve progress")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
            }
        });
    ;
};

export const updateProgress = (gameMapId, progress) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));
    const user = getUser(getState);

    axios
        .patch(
            `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/`,
            progress,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayError("Unable to update progress")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

// Delete progress and create a new one
export const resetProgress = (gameMapId, progress) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));
    const user = getUser(getState);

    axios
        .delete(
            `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, res.data));
            createProgress(gameMapId, progress)(dispatch, getState);
        })
        .catch(err => {
            displayError("Unable to delete progress")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
    ;
};

export const createOrResetProgress = (gameMapId, progress) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));
    const user = getUser(getState);

    axios
        .get(
            `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
            // Reset progress if there's an existing progress
            resetProgress(gameMapId, progress)(dispatch, getState);
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, null));
                // Create progress if there's an existing progress
                createProgress(gameMapId, progress)(dispatch, getState);

            } else {
                displayError("Unable to retrieve progress")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
            }
        });
    ;
};

export const submitAnswer = (gameMapId, questionId, answer) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, ADDITIONAL_METHODS.ANSWER));
    const user = getUser(getState);

    return (
        axios
            .post(
                `${API_URL}/${ENTITY_NAME}/users/${user.email}/gameMaps/${gameMapId}/questions/${questionId}/submit/`,
                answer,
                getTokenConfig(getState)
            )
            .then(res => {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, ADDITIONAL_METHODS.ANSWER, {
                    question: questionId,
                    isCorrect: res.data,
                }));
            })
            .catch(err => {
                displayError("Unable to submit answer")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, ADDITIONAL_METHODS.ANSWER));
            })
    )
};

export const fetchLeaderboard = gameMapId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, ADDITIONAL_METHODS.LEADERBOARD));

    axios
        .get(
            `${API_URL}/progress/gameMaps/${gameMapId}/leaderboard/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, ADDITIONAL_METHODS.LEADERBOARD, res.data));
        })
        .catch(err => {
            displayError("Unable to fetch leaderboard")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, ADDITIONAL_METHODS.LEADERBOARD));
        });
};

export const fetchReport = gameMapId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, ADDITIONAL_METHODS.REPORT));

    axios
        .get(
            `${API_URL}/progress/gameMaps/${gameMapId}/report/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, ADDITIONAL_METHODS.REPORT, res.data));
        })
        .catch(err => {
            displayError("Unable to fetch student report")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, ADDITIONAL_METHODS.REPORT));
        });
};

// SELECTORS
export const selectProgressLoading = state => state.progressReducer.crudlReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectProgressFailed = state => state.progressReducer.crudlReducer.isLoading[METHODS.RETRIEVE] === false && state.progressReducer.crudlReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectProgress = state => state.progressReducer.crudlReducer.item;

export const selectAnswerResultLoading = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.ANSWER] === true;
export const selectAnswerResultFailed = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.ANSWER] === false && state.progressReducer.additionalReducer.hasFailed[ADDITIONAL_METHODS.ANSWER] === true;
export const selectAnswerResult = state => state.progressReducer.additionalReducer.answerResult;

export const selectLeaderboardLoading = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.LEADERBOARD] === true;
export const selectLeaderboardFailed = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.LEADERBOARD] === false && state.progressReducer.additionalReducer.hasFailed[ADDITIONAL_METHODS.LEADERBOARD] === true;
export const selectLeaderboard = state => state.progressReducer.additionalReducer.leaderboard;

export const selectReportLoading = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.REPORT] === true;
export const selectReportFailed = state => state.progressReducer.additionalReducer.isLoading[ADDITIONAL_METHODS.REPORT] === false && state.progressReducer.additionalReducer.hasFailed[ADDITIONAL_METHODS.REPORT] === true;
export const selectReport = state => state.progressReducer.additionalReducer.report;