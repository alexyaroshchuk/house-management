import { v4 as uuidv4 } from 'uuid';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';

export const CONTRACTS_STATUS_TABS = [
    {
        id: uuidv4(),
        value: CONTRACTS_STATUS.ACTIVE,
        text: 'Active',
    },
    {
        id: uuidv4(),
        value: CONTRACTS_STATUS.ARCHIVE,
        text: 'Finished',
    },
];

export const TABLES = {
    MAIN_CONTRACTS: 'main-contracts',
    CONTRACTS: 'contracts',
};

export const MODALS = {
    ADD: 'ADD',
};
