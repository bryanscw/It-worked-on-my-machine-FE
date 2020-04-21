### Example:

```js
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { METHODS } from '../../../redux/ducks/apiHelper.js';
import { withReduxRouter } from '../../../utils/mock.js';

const initialState = {
    authReducer: {
        user: {
            "name": "Bob"
        }
    },
    topicsReducer: {
        items: [
            {
                "id": 1,
                "title": "Addition",
                "description": "Putting 2 and 2 together",
            },
            {
                "id": 2,
                "title": "Subtraction",
                "description": "Removing numbers from each other",
            }
        ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        }
    }
}

withReduxRouter(<LearningHomePage />, initialState)
```