export const SET_BUYER_CONTRACTS = 'CONTRACTS/BUYER/SET_CONTRACTS';

export const SET_SELLER_CONTRACTS = 'CONTRACTS/SELLER/SET_CONTRACTS';

export const SET_PAGINATION = 'CONTRACTS/PARAMS/SET_PAGINATION';

export const SET_SEARCH = 'CONTRACTS/PARAMS/SET_SEARCH';

export const SET_CONTRACTS_LOADER = 'CONTRACTS/SET_CONTRACTS_LOADER';

export const RESET_PARAMS = 'CONTRACTS/RESET_PARAMS';

export const CONTRACTS_STATUS = {
    ACTIVE: 'active',
    ARCHIVE: 'archive',
};

export const CONTRACTS_TYPE = {
    BUYER: 'buyer',
    SELLER: 'seller',
};

export const CONTRACTS_REQUEST = {
    [CONTRACTS_STATUS.ACTIVE]: '',
    [CONTRACTS_STATUS.ARCHIVE]: 'archive',
};

export const BUYER_CONTRACTS_REQUEST = {
    [CONTRACTS_STATUS.ACTIVE]: 'contracts',
    [CONTRACTS_STATUS.ARCHIVE]: `contracts/${CONTRACTS_STATUS.ARCHIVE}`,
};

export const SELLER_CONTRACTS_REQUEST = {
    [CONTRACTS_STATUS.ACTIVE]: 'main-seller-contracts',
    [CONTRACTS_STATUS.ARCHIVE]: `main-seller-contracts/${CONTRACTS_STATUS.ARCHIVE}`,
};
