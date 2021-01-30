import React, { createContext, useReducer, Children } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './Store/reducer';

const sellerStore = createContext(initialState);
const { Provider } = sellerStore;

const SellerContext = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {Children.only(children)}
        </Provider>
    );
};

SellerContext.propTypes = {
    children: PropTypes.element.isRequired,
};

export { sellerStore, SellerContext };
