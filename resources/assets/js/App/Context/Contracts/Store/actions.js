import {
    SET_BUYER_CONTRACTS,
    SET_SELLER_CONTRACTS,
    SET_PAGINATION,
    SET_SEARCH,
    SET_CONTRACTS_LOADER,
    RESET_PARAMS,
} from './constants';

export const setBuyerContracts = (contracts) => ({
    type: SET_BUYER_CONTRACTS,
    contracts,
});

export const setSellerContracts = (contracts) => ({
    type: SET_SELLER_CONTRACTS,
    contracts,
});

export const setPagination = (pagination) => ({
    type: SET_PAGINATION,
    pagination,
});
export const setSearch = (search) => ({
    type: SET_SEARCH,
    search,
});

export const setContractsLoader = (contractsLoader) => ({
    type: SET_CONTRACTS_LOADER,
    contractsLoader,
});

export const resetQueryParams = () => ({
    type: RESET_PARAMS,
});
