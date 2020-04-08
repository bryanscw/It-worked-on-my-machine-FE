import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'learningMaterials';

// REDUCER
const learningMaterialsReducer = createApiReducer(ENTITY_NAME);
export default learningMaterialsReducer;

// OPERATIONS
export const createLearningMaterial = (levelId, learningMaterial) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/create/`,
            learningMaterial,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayError("Unable to create learning material")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLearningMaterial = (levelId, learningMaterialId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterialId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayError("Unable to retrieve learning material")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLearningMaterial = (levelId, learningMaterial) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterial.id}/`,
            learningMaterial,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayError("Unable to update learning material")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteLearningMaterial = (levelId, learningMaterialId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterialId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            if (res.data === true) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, learningMaterialId));
            } else {
                throw new Error("Unable to delete learning material");
            }
        })
        .catch(err => {
            displayError("Unable to delete learning material")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLearningMaterials = (levelId) => (dispatch, getState) => {
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
            displayError("Unable to retrieve learning materials")(dispatch);
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
    ;
};

// SELECTORS
export const selectLearningMaterialsLoading = state => state.learningMaterialsReducer.isLoading[METHODS.LIST] === true;
export const selectLearningMaterialsFailed = state => state.learningMaterialsReducer.isLoading[METHODS.LIST] === false && state.learningMaterialsReducer.hasFailed[METHODS.LIST] === true;
export const selectLearningMaterials = state => state.learningMaterialsReducer.items;