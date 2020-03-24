import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // To use redux dev tools
    )
);

store.subscribe(()=>{
    localStorage.setItem('access_token', store.getState().authReducer.access_token)
    localStorage.setItem('refresh_token', store.getState().authReducer.refresh_token)
    localStorage.setItem('expires_in', store.getState().authReducer.expires_in)
    localStorage.setItem('time_token_acquired', store.getState().authReducer.time_token_acquired)
    localStorage.setItem('current_user', store.getState().authReducer.currentUser)
})

export default store;