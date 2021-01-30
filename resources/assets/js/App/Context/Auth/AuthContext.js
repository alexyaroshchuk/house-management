import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { initialState, reducer } from './Store/reducer';
import { userStorage } from './authStorage';

const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const user = get(state, 'user', {});

    userStorage.setUser(user);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

AuthContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { authStore, AuthContext };
