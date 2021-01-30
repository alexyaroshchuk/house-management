import { v4 as uuidv4 } from 'uuid';
import { CONTRACTS_STATUS } from '@Context/Contracts/Store/constants';

export const MODALS = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
};

export const MODALS_TITLE = {
    [MODALS.ADD]: 'Create new plan',
    [MODALS.EDIT]: 'Edit plan',
    [MODALS.DELETE]: 'Delete plan',
};
