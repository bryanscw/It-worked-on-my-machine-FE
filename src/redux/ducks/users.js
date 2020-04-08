import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayError } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'users';

// REDUCER
const usersReducer = createApiReducer(ENTITY_NAME, "email");
export default usersReducer;

// OPERATIONS
export const createUser = user => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    return (
        axios
            .post(
                `${API_URL}/users/create/`, 
                user,
                getTokenConfig(getState)
            )
            .then(res => {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
            })
            .catch(err => {
                displayError("Unable to create user")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
            })
    );
};

export const updateUser = (newUser, oldUser) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    return (
        axios
            .patch(
                `${API_URL}/users/${oldUser.email}`, 
                newUser,
                getTokenConfig(getState)
            )
            .then(res => {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
            })
            .catch(err => {
                displayError("Unable to update user")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
            })
    );
};

export const deleteUser = user => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    return (
        axios
            .delete(
                `${API_URL}/users/${user.email}`,
                getTokenConfig(getState),
            )
            .then(res => {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, user.email));
            })
            .catch(err => {
                displayError("Unable to delete user")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
            })
    );
};

export const listUsers = () => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    return (
        axios
            .get(
                `${API_URL}/users/`,
                getTokenConfig(getState)
            )
            .then(res => {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
            })
            .catch(err => {
                displayError("Unable to list users")(dispatch);
                dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
            })
    );
};

// SELECTORS
export const selectUsersLoading = state => state.usersReducer.isLoading[METHODS.LIST] === true;
export const selectUsersFailed = state => state.usersReducer.isLoading[METHODS.LIST] === false && state.usersReducer.hasFailed[METHODS.LIST] === true;
export const selectUsers = state => state.usersReducer.items;