import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const contractsStore = createContext(initialState);
const { Provider } = contractsStore;

const ContractsContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

ContractsContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { contractsStore, ContractsContext };
