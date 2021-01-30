import api from '@API/api';

export const getAnalytics = (filters) => {
    const baseObj = {
        url: `analytics`,
        params: filters,
        data: {},
    };

    return api.get(baseObj);
};
