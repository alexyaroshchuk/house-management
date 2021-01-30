import {
    SET_SELLER,
    SET_MAIN_SELLER_CONTRACT,
    SET_SELLER_CONTRACTS,
} from './constants';

export const initialState = {
    seller: {},
    mainSellerContract: {},
    sellerContracts: [],
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_SELLER:
            newState.seller = action.seller;
            break;
        case SET_MAIN_SELLER_CONTRACT:
            newState.mainSellerContract = action.mainSellerContract;
            break;
        case SET_SELLER_CONTRACTS:
            newState.sellerContracts = action.sellerContracts;
            break;
        default:
            return newState;
    }

    return newState;
};
