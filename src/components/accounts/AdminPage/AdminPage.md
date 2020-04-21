### Example:

```js
import { withReduxRouter } from '../../../utils/mock.js';
import { METHODS } from '../../../redux/ducks/apiHelper.js';

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
        isLoading: {
            [METHODS.LIST]: false,
        },
        hasFailed: {
            [METHODS.LIST]: false,
        },
    }   
}

withReduxRouter((
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <AdminPage/>
    </>
), initialState)
```