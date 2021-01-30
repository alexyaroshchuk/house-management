import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const managementStore = createContext(initialState);
const { Provider } = managementStore;

const ManagementContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

ManagementContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { managementStore, ManagementContext };
