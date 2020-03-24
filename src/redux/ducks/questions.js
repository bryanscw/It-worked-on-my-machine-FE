import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'questions';

// REDUCER
const questionsReducer = createApiReducer(ENTITY_NAME);
export default questionsReducer;

const questionReader = question => {
    const optionKeys = Object.keys(question.options);
    let optionArr = [];
    let answerForArr = null;

    for (const key of optionKeys) {
        if (parseInt(key) === question.answer)   
            answerForArr = optionArr.length;
        
        optionArr.push(question.options[key]);
    }

    return {
        ...question,
        options: optionArr,
        answer: answerForArr,
    };
}

const questionWriter = question => {
    let optionsObj = {};

    for (let i = 0; i < question.options.length; i++)
        optionsObj[i] = question.options[i];

    return {
        ...question,
        options: optionsObj,
    };
}

// OPERATIONS
export const createQuestion = (levelId, question) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/create/`,
            {
                ...questionWriter(question),
                coordinates: {
                    x: 0,
                    y: 0
                }
            },
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayError("Unable to create question")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveQuestion = (levelId, questionId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${questionId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve question")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateQuestion = (levelId, question) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${question.id}/`,
            questionWriter(question),
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayError("Unable to update question")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteQuestion = (levelId, questionId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${questionId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            if (res.data === true) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, questionId));
            } else {
                throw new Error("Unable to delete question");
            }
        })
        .catch(err => {
            displayError("Unable to delete question")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listQuestions = (levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve questions")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
};

// SELECTORS
export const selectQuestionsLoading = state => state.questionsReducer.isLoading[METHODS.LIST] === true;
export const selectQuestionsFailed = state => state.questionsReducer.isLoading[METHODS.LIST] === false && state.questionsReducer.hasFailed[METHODS.LIST] === true;
export const selectQuestions = state => state.questionsReducer.items.map(question => questionReader(question));