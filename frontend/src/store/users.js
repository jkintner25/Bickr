import { csrfFetch } from "./csrf";

const ADD_USER = "users/ADD_USER";

const add = (user) => ({
    type: ADD_USER,
    user
});

export const addUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`);

    const user = await response.json();
    dispatch(add(user));
};

const initialState = {}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return { ...state, [action.user.id]: action.user };
        default:
            return state;
    }
}

export default usersReducer;
