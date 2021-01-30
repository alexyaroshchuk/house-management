import api from '../../../../Framework/Api/api';

export const login = (payload) => {
    const baseObj = {
        url: 'login',
        data: payload,
    };
    return api.post(baseObj);
};

export const logout = () => {
    const baseObj = {
        url: 'logout',
        data: {},
    };
    return api.post(baseObj);
};

export const getUser = () => {
    const baseObj = {
        url: 'auth/user',
        data: {},
        config: {
            errorHandle: false,
        },
    };
    return api.get(baseObj);
};
