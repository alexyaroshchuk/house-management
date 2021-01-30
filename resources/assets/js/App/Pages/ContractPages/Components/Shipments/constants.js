export const MODALS = {
    ADD_SHIPMENT: 'ADD_SHIPMENT',
    EDIT_SHIPMENT: 'EDIT_SHIPMENT',
    ADD_CONTAINER: 'ADD_CONTAINER',
    EDIT_CONTAINER: 'EDIT_CONTAINER',
    MERGE_SHIPMENTS: 'MERGE_SHIPMENTS',
    DELETE_CONTAINER: 'DELETE_CONTAINER',
    ADD_INCOME: 'ADD_INCOME',
    ADD_PAYMENT: 'ADD_PAYMENT',
    EDIT_INCOME: 'EDIT_INCOME',
    EDIT_PAYMENT: 'EDIT_PAYMENT',
    DELETE_INCOME: 'DELETE_INCOME',
    DELETE_PAYMENT: 'DELETE_PAYMENT',
    CHANGE_SHIPMENT_STATUS: 'CHANGE_SHIPMENT_STATUS',
};

export const active = 'active';
export const inactive = 'inactive';

export const income = 'income';
export const outcome = 'outcome';

export const PAYMENT_TYPE_TEXT = {
    DOWN: 'Down payment',
    POST: 'Post payment',
};

export const PAYMENT_TYPE_VALUE = {
    DOWN: 'down',
    POST: 'post',
};

export const PAYMENT_TYPE_OPTIONS = [
    { id: 1, value: PAYMENT_TYPE_VALUE.DOWN, text: PAYMENT_TYPE_TEXT.DOWN },
    { id: 2, value: PAYMENT_TYPE_VALUE.POST, text: PAYMENT_TYPE_TEXT.POST },
];
