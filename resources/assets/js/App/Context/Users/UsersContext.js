import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const usersStore = createContext(initialState);
const { Provider } = usersStore;

const UsersContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

UsersContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { usersStore, UsersContext };
