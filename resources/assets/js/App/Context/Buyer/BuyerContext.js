import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const buyerStore = createContext(initialState);
const { Provider } = buyerStore;

const BuyerContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

BuyerContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { buyerStore, BuyerContext };
