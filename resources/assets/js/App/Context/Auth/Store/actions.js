import { SET_USER, CLEAR_USER, USER_LOADING } from './constants';

export const setUser = (user) => ({
    type: SET_USER,
    user,
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const setUserLoading = (userLoading) => ({
    type: USER_LOADING,
    userLoading,
});
