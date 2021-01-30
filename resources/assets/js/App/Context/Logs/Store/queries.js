import api from '@API/api';

export const getLogs = (queryParams = '') => {
    const baseObj = {
        url: queryParams ? `logs?${queryParams}` : 'logs',
        data: {},
    };
    return api.get(baseObj);
};

export const getLastLogs = () => {
    const baseObj = {
        url: 'logs/last',
        data: {},
    };
    return api.get(baseObj);
};
