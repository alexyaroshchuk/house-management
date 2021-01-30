import {
    SET_USERS,
    SET_USERS_LOADER,
    SET_MODAL_LOADER,
    SET_SUCCESS,
} from './constants';

export const setUsers = (users) => ({
    type: SET_USERS,
    users,
});

export const setUsersLoader = (usersLoader) => ({
    type: SET_USERS_LOADER,
    usersLoader,
});

export const setModalLoader = (modalLoader) => ({
    type: SET_MODAL_LOADER,
    modalLoader,
});

export const setSuccess = (success) => ({
    type: SET_SUCCESS,
    success,
});
