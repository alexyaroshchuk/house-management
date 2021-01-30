import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const logsStore = createContext(initialState);
const { Provider } = logsStore;

const LogsContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

LogsContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { logsStore, LogsContext };
