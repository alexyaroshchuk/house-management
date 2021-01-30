import {
    SET_SELLER,
    SET_MAIN_SELLER_CONTRACT,
    SET_SELLER_CONTRACTS,
} from './constants';

export const setSeller = (seller) => ({
    type: SET_SELLER,
    seller,
});

export const setMainSellerContract = (mainSellerContract) => ({
    type: SET_MAIN_SELLER_CONTRACT,
    mainSellerContract,
});

export const setSellerContracts = (sellerContracts) => ({
    type: SET_SELLER_CONTRACTS,
    sellerContracts,
});
