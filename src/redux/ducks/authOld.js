import { USER_ROLES } from "../../utils/constants";

// REDUCER
const initialState = {
    user: {
        name: 'Bob',
        role: USER_ROLES.STUDENT,
        email: 'bob@e.ntu.edu.sg',
        accessToken: 'b1b1d2be-3377-4ad1-8603-38af829e3e32',
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};