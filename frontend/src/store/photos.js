import { csrfFetch } from "./csrf";

//action types
const ADD_PHOTO = "photos/ADD_PHOTO";
const GET_ALL_PHOTOS = "photos/GET_ALL_PHOTOS";
const UPDATE_PHOTO = "photos/UPDATE_PHOTO";
const REMOVE_PHOTO = "photos/REMOVE_PHOTO";

//define actions
const add = (photo) => ({
    type: ADD_PHOTO,
    photo
});

const load = (photo) => ({
    type: GET_ALL_PHOTOS,
    photo
});

const edit = (photo) => ({
    type: UPDATE_PHOTO,
    photo
});

const remove = (photo) => ({
    type: REMOVE_PHOTO,
    photo
})

//write thunk
export const addPhoto = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/photos`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    const photo = await response.json();
    dispatch(add(photo));
};

export const loadPhotos = () => async dispatch => {
    const response = await csrfFetch(`/api/photos/all`);
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

export const editPhoto = ({id, description}) => async dispatch => {
    const response = await csrfFetch(`/api/photos/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({description})
    })
    const photo = await response.json();
    dispatch(edit(photo));
};

export const removePhoto = (id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/remove/${id}`, {
        method: "DELETE",
    })
    const photo = await response.json();
    dispatch(remove(photo));
}

export const findPhoto = (id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${id}`)
    const photo = await response.json();
    dispatch(add(photo));
}

//write reducer
const initialState = {}

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        case GET_ALL_PHOTOS:
            const newState = {}
            action.photo.forEach(photo => {
                newState[photo.id] = photo;
            });
            return newState;
        case UPDATE_PHOTO:
            return { ...state, [action.photo.id]: action.photo };
        case REMOVE_PHOTO:
            const currentState = {...state}
            delete currentState[action.photo.id]
            return currentState;
        default:
            return state;
    }
};

export default photosReducer;
