import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';
import generateMaze from '../../utils/generateMaze';
import { updateQuestion } from './questions';

const ENTITY_NAME = 'gameMaps';

// REDUCER
const levelsReducer = createApiReducer(ENTITY_NAME);
export default levelsReducer;

// OPERATIONS
export const createLevel = (topicId, level) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/create/`,
            {
                ...level,
                playable: false,
            },
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayError("Unable to create level")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLevel = (topicId, levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${levelId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve level")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLevel = (topicId, level) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${level.id}/`,
            level,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayError("Unable to update level")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const publishLevel = (topicId, levelId) => (dispatch, getState) => {    
    dispatch(createApiAction('questions', STATUSES.REQUEST, METHODS.LIST));
    
    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/questions/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction('questions', STATUSES.SUCCESS, METHODS.LIST, res.data));

            const questions = res.data.content;
            
            const {
                mapDescriptor,
                questionCoordinates
            } = generateMaze(questions.length);
            
            for (let i = 0; i < questions.length; i++) {
                updateQuestion(levelId, {
                    ...questions[i],
                    coordinates: {
                        x: questionCoordinates[i][0],
                        y: questionCoordinates[i][1],
                    }
                })(dispatch, getState);
            }

            updateLevel(topicId, {
                id: levelId,
                playable: true,
                mapDescriptor: mapDescriptor
            })(dispatch, getState);
        })
        .catch(err => {
            displayError("Unable to retrieve questions")(dispatch);
            dispatch(createApiAction('questions', STATUSES.FAILURE, METHODS.LIST));
        });
    
};

export const deleteLevel = (topicId, levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${levelId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            if (res.data === true) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, levelId));
            } else {
                throw new Error("Unable to delete level");
            }
        })
        .catch(err => {
            displayError("Unable to delete level")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLevels = (topicId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve levels")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
};

// SELECTORS
export const selectLevelsLoading = state => state.levelsReducer.isLoading[METHODS.LIST] === true;
export const selectLevelsFailed = state => state.levelsReducer.isLoading[METHODS.LIST] === false && state.levelsReducer.hasFailed[METHODS.LIST] === true;
export const selectLevels = state => state.levelsReducer.items;

export const selectLevelLoading = state => state.levelsReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectLevelFailed = state => state.levelsReducer.isLoading[METHODS.RETRIEVE] === false && state.levelsReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectLevel = state => state.levelsReducer.item;

export const selectPlayableLevels = state => state.levelsReducer.items.filter(item => item.playable);
export const selectPlayableLevel = state => (state.levelsReducer.item && state.levelsReducer.item.playable) ? state.levelsReducer.item : null;