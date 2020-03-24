import { API_URL } from "../../utils/constants";

// ACTION TYPES
export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

// REDUCER
const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      console.log(action.payload)
      return {
        ...state,
        items: action.payload
      };
    case CREATE_USER_SUCCESS:
      // state.items.push(action.payload)
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case CREATE_USER_FAIL:
      // state.items.push(action.payload)
      alert("FAIL TO CREATE USERS")
      console.log(action.payload)
      return {
        ...state
      };

    case UPDATE_USER_SUCCESS:
        console.log(state.items)
        const index = state.items.findIndex(user => user.email === action.payload.email)
        state.items.splice(index, 1, action.payload)
        return {
          ...state,
          items: [...state.items]
          };

    case UPDATE_USER_FAIL:
      alert("FAIL TO UPDATE USER")
      return {
        ...state
        };
        
    case DELETE_USER_SUCCESS:
      let newState = state.items.filter(function(user) {return user.email !== action.payload.email});
        return {
          ...state,
        items: newState
          };
    case DELETE_USER_FAIL:
      // state.items.push(action.payload)
      alert("FAIL TO DELETE USERS")
      console.log(action.payload)
      return {
        ...state
      };
    default:
      return state;
  }
}

// ACTION CREATORS
export const fetchUsers = () => dispatch => {
  return(
  fetch(`${API_URL}/users/`,{
      method: 'GET',
      headers:{
        Authorization: `bearer ${localStorage.getItem("access_token")}`
      }
    })
  .then(res => {if(!res.ok){throw res} return res.json()})
  .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users.content
      })
     )
   )
  
};

export const createUser = newUser => dispatch => {

  return(
  fetch(`${API_URL}/users/create/`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(res => {if(!res.ok){throw res} return res.json()})
    .then(user => 
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
      }))
    .catch(error => 
      dispatch({
        type: CREATE_USER_FAIL,
        payload: error
      }))
  )
};

export const updateUser = (newUserData,oldUserData) => dispatch => {
  return(
  fetch(`${API_URL}/users/${oldUserData.email}`, {
    method: 'PATCH',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUserData)
  })
    .then(res => {if(!res.ok){throw res} return res.json()})
    .then(user =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: user
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error
      })
    )
  )
};

export const deleteUser = UserData => dispatch => { 
  return(
  fetch(`${API_URL}/users/${UserData.email}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`
    },
  })
  .then(res => {if(!res.ok){throw res} return res.json()})
  .then(user =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: UserData
      }))
  .catch(error=> 
        dispatch({
        type: DELETE_USER_FAIL,
        payload: error
    }))
  )
};


