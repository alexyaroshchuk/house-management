import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const dashboardStore = createContext(initialState);
const { Provider } = dashboardStore;

const DashboardContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

DashboardContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { dashboardStore, DashboardContext };
