import { API_URL } from "../../utils/constants";
import {getCurrentTime} from '../../utils/getCurrentTime';

export const FETCH_ME = 'FETCH_ME';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

// REDUCER
const initialState = {
  loginSucess: false,
  user:{},
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  expires_in: localStorage.getItem("expires_in"),
  time_token_acquired: getCurrentTime()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
        if(action.payload.access_token){
            return {
                ...state,
                loginSuccess: true,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: 0,//action.payload.expires_in
                time_token_acquired: getCurrentTime()
            }}
        else{
          alert("successful authentication but no access_token!")
        }
        break;
    
    case FETCH_ME:
      return {
        ...state,
        user: action.payload
        //store refresh and access token in localStorage
    }
         
    case AUTH_LOGIN_FAIL:
            return {
              ...state,
              user:'',
              loginSuccess: false,
         };
    
    case AUTH_LOGOUT:
          //remove refresh and access token in localStorage
          localStorage.removeItem("access_token" );
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("expires_in");
          localStorage.removeItem("current_user");
          localStorage.removeItem("time_token_acquired");
          return {
              ...state,
              loginSuccess: false,
              user: '',
              access_token:'',
              refresh_token:'',
              expires_in:0,
              time_token_acquired:''
          }

    case REFRESH_TOKEN:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_in: action.payload.expires_in
    }
    default:
        return state;
    
  }

}

// ACTION CREATORS
export const authenticateLogin = userData => dispatch =>{

    var formdata = new FormData();
    formdata.append("username", userData.username);
    formdata.append("password", userData.password);
    formdata.append("grant_type", "password");

        fetch(`${API_URL}/oauth/token`, {
            method: 'POST',
            headers: {
            'Authorization': 'Basic bXktY2xpZW50Om15LXNlY3JldA==' //+ btoa('my-client:my-secret')
            },
            body: formdata,
        }).then(res =>
          { 
            if(!res.ok){
              throw res
            }
            return res.json()
        })
        .then(result => 
          // dispatch(fetchMe(result.access_token))
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: result
          }))
        .catch(error =>{
          dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error
        })});
    };

export const fetchMe = access_token => dispatch => { 
  fetch(`${API_URL}/users/me`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${access_token}`
    },
  })
    .then(res => res.json())
    .then(user =>{
      dispatch({
        type: FETCH_ME,
        payload: user
      })
    }
    );
};

export const logout = () => dispatch =>{
  fetch(`${API_URL}/oauth/revoke`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'bearer '+ localStorage.getItem('access_token')
      },
  })
  .then(() => 
    dispatch({
      type: AUTH_LOGOUT,
    })
  )
};