import api from '../../../../Framework/Api/api';

// contract
export const getBuyerContract = (id) => {
    const baseObj = {
        url: `contracts/${id}`,
        data: {},
    };
    return api.get(baseObj);
};

export const getSellerContract = (id) => {
    const baseObj = {
        url: `seller-contracts/${id}`,
        data: {},
    };
    return api.get(baseObj);
};

export const changeBuyerContractStatus = (id, payload) => {
    const baseObj = {
        url: `contracts/archive/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const changeSellerContractStatus = (id, payload) => {
    const baseObj = {
        url: `main-seller-contracts/archive/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const getDirectory = () => {
    const baseObj = {
        url: 'contracts/directory',
        data: {},
    };
    return api.get(baseObj);
};

export const getBuyers = (id) => {
    const baseObj = {
        url: `buyers/planned/${id}`,
        data: {},
    };
    return api.get(baseObj);
};

export const addBuyerContract = (payload) => {
    const baseObj = {
        url: 'contracts',
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const addSellerContract = (payload) => {
    const baseObj = {
        url: 'seller-contracts',
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const editBuyerContract = (payload, id) => {
    const baseObj = {
        url: `contracts/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const editSellerContract = (payload, id) => {
    const baseObj = {
        url: `main-seller-contracts/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const deleteBuyerContract = (id) => {
    const baseObj = {
        url: `contracts`,
        id,
    };
    return api.delete(baseObj);
};

export const deleteSellerContract = (id) => {
    const baseObj = {
        url: `main-seller-contracts`,
        id,
    };
    return api.delete(baseObj);
};

export const getCommodities = (id) => {
    const baseObj = {
        url: `commodities/logos/${id}`,
        data: {},
    };
    return api.get(baseObj);
};

//notes

export const addNote = (payload) => {
    const baseObj = {
        url: `notes`,
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const editNote = (id, payload) => {
    const baseObj = {
        url: `notes/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const deleteNote = (id) => {
    const baseObj = {
        url: `notes`,
        id,
    };
    return api.delete(baseObj);
};

// planned shipments

export const addEditPlan = (id, payload) => {
    const baseObj = {
        url: `seller-contracts/planned/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const deletePlan = (id, payload) => {
    const baseObj = {
        url: `seller-contracts/planned`,
        id,
        data: {
            ...payload,
        },
    };
    return api.delete(baseObj);
};

// shipments

export const addShipment = (payload) => {
    const baseObj = {
        url: 'shipments',
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const editShipment = (payload, id) => {
    const baseObj = {
        url: `shipments/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const mergeShipments = (payload) => {
    const baseObj = {
        url: 'shipments/merge',
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const changeShipmentStatus = (payload, id) => {
    const baseObj = {
        url: `shipments/archive/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const getSellers = (id) => {
    const baseObj = {
        url: `contracts/${id}/seller-contracts`,
        data: {},
    };
    return api.get(baseObj);
};

export const getSellersByContractId = (id) => {
    const baseObj = {
        url: `contracts/sellers/${id}`,
        data: {},
    };
    return api.get(baseObj);
};

export const addContainer = (payload) => {
    const baseObj = {
        url: 'containers',
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const editContainer = (payload, id) => {
    const baseObj = {
        url: `containers/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const deleteContainer = (id) => {
    const baseObj = {
        url: 'containers',
        id,
    };
    return api.delete(baseObj);
};

export const addShipmentIncomeOutcome = (payload) => {
    const baseObj = {
        url: 'payments',
        data: {
            ...payload,
        },
    };
    return api.post(baseObj);
};

export const editShipmentIncomeOutcome = (payload, id) => {
    const baseObj = {
        url: `payments/${id}`,
        data: {
            ...payload,
        },
    };
    return api.put(baseObj);
};

export const deleteShipmentIncomeOutcome = (id) => {
    const baseObj = {
        url: `payments`,
        id,
    };
    return api.delete(baseObj);
};

// expenses

export const getExpenses = () => {
    const baseObj = {
        url: 'expenses/types',
        data: {},
    };
    return api.get(baseObj);
};

export const getExpenseTypes = () => {
    const baseObj = {
        url: 'expenses/expense-types',
        data: {},
    };
    return api.get(baseObj);
};

export const getBanks = () => {
    const baseObj = {
        url: 'banks',
        data: {},
    };
    return api.get(baseObj);
};

export const addExpense = (payload) => {
    const baseObj = {
        url: 'expenses',
        data: {
            ...payload,
        },
    };

    return api.post(baseObj);
};

export const editExpense = (payload, id) => {
    const baseObj = {
        url: `expenses/${id}`,
        data: {
            ...payload,
        },
    };

    return api.put(baseObj);
};

export const deleteExpense = (id) => {
    const baseObj = {
        url: `expenses`,
        id,
    };
    return api.delete(baseObj);
};

export const transfer = (data) => {
    const baseObj = {
        url: 'expenses/transfer',
        data: {
            ...data,
        },
    };
    return api.post(baseObj);
};
