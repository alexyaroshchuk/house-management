import api from '@API/api';

export const getManagementInfo = (id, params = {}, config = {}) => {
    const baseObj = {
        url: `contracts/management/${id}`,
        params,
        config,
    };
    return api.get(baseObj);
};
