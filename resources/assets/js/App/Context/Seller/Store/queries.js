import api from '../../../../Framework/Api/api';

export const getSeller = (id) => {
    const baseObj = {
        url: `sellers/${id}`,
        data: {},
    };

    return api.get(baseObj);
};

export const getMainSellerContract = (id) => {
    const baseObj = {
        url: `main-seller-contracts/${id}`,
        data: {},
    };

    return api.get(baseObj);
};

export const createMainSellerContract = (data) => {
    const baseObj = {
        url: 'seller-contracts',
        data: {
            ...data,
        },
    };

    return api.post(baseObj);
};

export const editMainSellerContract = (data, id) => {
    const baseObj = {
        url: `main-seller-contracts/${id}`,
        data: {
            ...data,
        },
    };

    return api.put(baseObj);
};

export const changeMainSellerContractStatus = (data, id) => {
    const baseObj = {
        url: `main-seller-contracts/archive/${id}`,
        data: {
            ...data,
        },
    };

    return api.put(baseObj);
};

export const getSellerContracts = () => {
    const baseObj = {
        url: 'seller-contracts',
        data: {},
    };
    return api.get(baseObj);
};
