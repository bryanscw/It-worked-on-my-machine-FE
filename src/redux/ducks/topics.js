import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'topics';

// REDUCER
const topicsReducer = createApiReducer(ENTITY_NAME);
export default topicsReducer;

// OPERATIONS
export const createTopic = topic => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/${ENTITY_NAME}/create/`,
            topic,
            getTokenConfig(getState)
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayError("Unable to create topic")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveTopic = topicId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/${ENTITY_NAME}/${topicId}/`,
            getTokenConfig(getState)
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve topic")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateTopic = topic => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));
    axios
        .patch(
            `${API_URL}/${ENTITY_NAME}/${topic.id}/`,
            topic,
            getTokenConfig(getState)
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayError("Unable to update topic")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteTopic = topicId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/${ENTITY_NAME}/${topicId}/`,
            getTokenConfig(getState)
        )
        .then(res => {
            if (res.data === true) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, topicId));
            } else {
                throw new Error("Unable to delete topic");
            }
        })
        .catch(err => {
            displayError("Unable to delete topic")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listTopics = () => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(
            `${API_URL}/${ENTITY_NAME}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve topics")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
};

// SELECTORS
export const selectTopicsLoading = state => state.topicsReducer.isLoading[METHODS.LIST] === true;
export const selectTopicsFailed = state => state.topicsReducer.isLoading[METHODS.LIST] === false && state.topicsReducer.hasFailed[METHODS.LIST] === true;
export const selectTopics = state => state.topicsReducer.items;

export const selectTopicLoading = state => state.topicsReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectTopicFailed = state => state.topicsReducer.isLoading[METHODS.RETRIEVE] === false && state.topicsReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectTopic = state => state.topicsReducer.item;