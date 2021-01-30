import { SET_BUYER } from './constants';

export const initialState = {
    buyer: {},
};

const normalizeBuyerInfo = (buyer) => {
    return buyer;
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };
    switch (action.type) {
        case SET_BUYER:
            newState.buyer = normalizeBuyerInfo(action.buyer);
            break;

        default:
            return newState;
    }
    return newState;
};
