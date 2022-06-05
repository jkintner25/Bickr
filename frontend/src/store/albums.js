import { csrfFetch } from "./csrf";

const ADD_ALBUM = "albums/ADD_ALBUM";
const GET_ALBUMS = "albums/GET_ALBUMS";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const REMOVE_ALBUM = "albums/REMOVE_ALBUMS";

//actions
const add = (album) => ({
    type: ADD_ALBUM,
    album
});

const load = (albums) => ({
    type: GET_ALBUMS,
    albums
});

const edit = (album) => ({
    type: UPDATE_ALBUM,
    album
});

const remove = (album) => ({
    type: REMOVE_ALBUM,
    album
});

//thunk middleware
export const addAlbum = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/albums`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    const album = await response.json();
    dispatch(add(album));
};

//get single album
export const getAlbum = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`,);
    if (response.ok) {
        const album = await response.json();
        dispatch(add(album));
    }
};

//get all albums of userId
export const getUserAlbums = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/users/${id}`,);
    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums));
    }
};

export const editAlbum = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })
    const album = await response.json();
    dispatch(edit(album));
};

export const deleteAlbum = (id) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "DELETE",
    })
    const album = await response.json();
    dispatch(remove(album));
};

const initialState = {}

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS:
            const newAlbums = action.albums.reduce((map, album) => {
                map[album.id] = album;
                return map
            }, {})
            return { ...state, ...newAlbums }
        case ADD_ALBUM:
            return { ...state, [action.album.id]: action.album };
        default:
            return state;
    }
}

export default albumsReducer;
