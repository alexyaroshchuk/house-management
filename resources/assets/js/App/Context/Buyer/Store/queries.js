import api from '@API/api';

export const getBuyer = (id, params = {}, config = {}) => {
    const baseObj = {
        url: `buyers/${id}`,
        params,
        config,
    };
    return api.get(baseObj);
};
