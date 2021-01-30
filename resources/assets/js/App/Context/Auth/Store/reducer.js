import { camelCase, get } from 'lodash';
import { SET_USER, CLEAR_USER, USER_LOADING } from './constants';
import { userStorage } from '../authStorage';

export const initialState = {
    user: userStorage.getUser() || {},
    userLoading: false,
};

const normalizeUser = (user) => {
    const role = camelCase(get(user, 'role', ''));
    const newUser = {
        ...user,
        role,
    };
    return newUser;
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_USER:
            newState.user = normalizeUser(action.user);
            break;
        case CLEAR_USER:
            newState.user = {};
            break;
        case USER_LOADING:
            newState.userLoading = action.userLoading;
            break;
        default:
            return newState;
    }
    return newState;
};
