import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const analyticsStore = createContext(initialState);
const { Provider } = analyticsStore;

const AnalyticsContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

AnalyticsContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { analyticsStore, AnalyticsContext };
