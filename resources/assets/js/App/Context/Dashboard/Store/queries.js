import api from '@API/api';

export const getDashboard = () => {
    const baseObj = {
        url: 'ceo',
        data: {},
    };

    return api.get(baseObj);
};

export const getPayments = (params = {}) => {
    const baseObj = {
        url: 'payments/money-management',
        params,
        data: {},
    };

    return api.get(baseObj);
};

export const getCredits = () => {
    const baseObj = {
        url: 'credits',
        data: {},
    };

    return api.get(baseObj);
};

export const addCreditLine = (credit) => {
    const baseObj = {
        url: 'credits',
        data: {
            ...credit,
        },
    };

    return api.post(baseObj);
};

export const editCreditLine = (credit, id) => {
    const baseObj = {
        url: `credits/${id}`,
        data: {
            ...credit,
        },
    };

    return api.put(baseObj);
};

export const deleteCreditLine = (id) => {
    const baseObj = {
        url: 'credits',
        id,
    };

    return api.delete(baseObj);
};
