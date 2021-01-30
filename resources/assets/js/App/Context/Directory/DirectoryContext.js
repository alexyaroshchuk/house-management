import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const directoryStore = createContext(initialState);
const { Provider } = directoryStore;

const DirectoryContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

DirectoryContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { directoryStore, DirectoryContext };
