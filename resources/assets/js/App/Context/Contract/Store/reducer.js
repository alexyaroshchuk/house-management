import {
    SET_CONTRACT,
    SET_CONTRACT_LOADER,
    SET_CONTRACT_DIRECTORY,
    SET_MODAL_LOADER,
    SET_SELLERS,
    SET_SELLERS_BY_CONTRACT_ID,
    SET_EXPENSES,
    SET_BUYERS,
    SET_EXPENSE_TYPES,
    SET_BANKS,
    SET_COMMODITIES,
} from './constants';

export const initialState = {
    contract: {},
    contractLoader: false,
    contractDirectory: {},
    modalLoader: false,
    sellers: [],
    expenses: [],
    buyers: [],
    expenseTypes: [],
    banks: [],
    sellersByContractId: [],
    commodities: [],
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };
    switch (action.type) {
        case SET_CONTRACT:
            newState.contract = action.contract;
            break;
        case SET_CONTRACT_LOADER:
            newState.contractLoader = action.contractLoader;
            break;
        case SET_CONTRACT_DIRECTORY:
            newState.contractDirectory = action.contractDirectory;
            break;
        case SET_MODAL_LOADER:
            newState.modalLoader = action.modalLoader;
            break;
        case SET_SELLERS:
            newState.sellers = action.sellers;
            break;
        case SET_SELLERS_BY_CONTRACT_ID:
            newState.sellersByContractId = action.sellersByContractId;
            break;
        case SET_EXPENSES:
            newState.expenses = action.expenses;
            break;
        case SET_BUYERS:
            newState.buyers = action.buyers;
            break;
        case SET_EXPENSE_TYPES:
            newState.expenseTypes = action.expenseTypes;
            break;
        case SET_BANKS:
            newState.banks = action.banks;
            break;
        case SET_COMMODITIES:
            newState.commodities = action.commodities;
            break;
        default:
            return newState;
    }
    return newState;
};
