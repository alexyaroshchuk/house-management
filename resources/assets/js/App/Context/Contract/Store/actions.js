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

export const setContract = (contract) => ({
    type: SET_CONTRACT,
    contract,
});

export const setContractLoader = (contractLoader) => ({
    type: SET_CONTRACT_LOADER,
    contractLoader,
});

export const setContractDirectory = (contractDirectory) => ({
    type: SET_CONTRACT_DIRECTORY,
    contractDirectory,
});

export const setModalLoader = (modalLoader) => ({
    type: SET_MODAL_LOADER,
    modalLoader,
});

export const setSellers = (sellers) => ({
    type: SET_SELLERS,
    sellers,
});

export const setSellersByContractId = (sellersByContractId) => ({
    type: SET_SELLERS_BY_CONTRACT_ID,
    sellersByContractId,
});

export const setExpenses = (expenses) => ({
    type: SET_EXPENSES,
    expenses,
});

export const setBuyers = (buyers) => ({
    type: SET_BUYERS,
    buyers,
});

export const setExpenseTypes = (expenseTypes) => ({
    type: SET_EXPENSE_TYPES,
    expenseTypes,
});

export const setBanks = (banks) => ({
    type: SET_BANKS,
    banks,
});

export const setCommodities = (commodities) => ({
    type: SET_COMMODITIES,
    commodities,
});
