import api from '../../../../Framework/Api/api';

export const getUsers = () => {
    const baseObj = {
        url: `users`,
        data: {},
    };
    return api.get(baseObj);
};

export const editUser = (user) => {
    const { id, ...userData } = user;
    const baseObj = {
        url: `users/${id}`,
        data: { ...userData },
    };
    return api.put(baseObj);
};

export const deleteUser = (userId) => {
    const baseObj = {
        url: 'users',
        id: userId,
        data: {},
    };
    return api.del(baseObj);
};

export const addUser = (user) => {
    const { email, name, role, password } = user;
    const baseObj = {
        url: 'users',
        data: {
            name,
            email,
            role,
            password,
        },
    };
    return api.post(baseObj);
};
