import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const contractStore = createContext(initialState);
const { Provider } = contractStore;

const ContractContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

ContractContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { contractStore, ContractContext };
