import {
    SET_BUYER_CONTRACTS,
    SET_SELLER_CONTRACTS,
    SET_PAGINATION,
    SET_SEARCH,
    SET_CONTRACTS_LOADER,
    RESET_PARAMS,
} from './constants';

const PAGE_SIZE = 10;

const initialParams = {
    pagination: {
        page: 1,
        pageSize: PAGE_SIZE,
        total: 0,
    },
    search: '',
};

const getInitialParams = () => {
    return {
        ...initialParams,
    };
};

export const initialState = {
    contracts: [],
    params: getInitialParams(),
    contractsLoader: false,
};

const normalizeBuyerContracts = (contracts) => {
    return contracts;
};

const normalizeSellerContracts = (contracts) => {
    return contracts;
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };
    switch (action.type) {
        case SET_BUYER_CONTRACTS:
            newState.contracts = normalizeBuyerContracts(action.contracts);
            break;
        case SET_SELLER_CONTRACTS:
            newState.contracts = normalizeSellerContracts(action.contracts);
            break;
        case SET_PAGINATION:
            newState.params.pagination = action.pagination;
            break;
        case SET_SEARCH:
            newState.params.search = action.search;
            break;
        case RESET_PARAMS:
            newState.params = getInitialParams();
            break;
        case SET_CONTRACTS_LOADER:
            newState.contractsLoader = action.contractsLoader;
            break;
        default:
            return newState;
    }
    return newState;
};
