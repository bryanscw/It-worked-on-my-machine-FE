### Example:

```js
import { withReduxRouter } from '../../../utils/mock.js';

const initialState = {
    usersReducer: {
        items: [
            {
            "name": "Bob",
            "email": "bob@test.com",
            "role" : "ROLE_STUDENT"
            },
            {
            "name": "Sam",
            "email": "sam@test.com",
            "role" : "ROLE_TEACHER"
            },
            {
            "name": "Adam",
            "email": "admin@test.com",
            "role" : "ROLE_ADMIN"
            }
        ],
        usersLoading: false,
        usersFailed: false,
        isLoading: false
    }   
}

withReduxRouter((
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <AdminPage/>
    </>
), initialState).renderedComponent    

```