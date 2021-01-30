import {
    SET_USERS,
    SET_USERS_LOADER,
    SET_MODAL_LOADER,
    SET_SUCCESS,
} from './constants';

export const initialState = {
    users: [],
    usersLoader: false,
    modalLoader: false,
    success: false,
};

const setUsers = (users) => {
    return users;
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_USERS:
            newState.users = setUsers(action.users);
            break;
        case SET_USERS_LOADER:
            newState.usersLoader = action.usersLoader;
            break;
        case SET_MODAL_LOADER:
            newState.modalLoader = action.modalLoader;
            break;
        case SET_SUCCESS:
            newState.success = action.success;
            break;
        default:
            return newState;
    }
    return newState;
};
