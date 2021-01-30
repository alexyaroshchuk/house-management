import api from '../../../../Framework/Api/api';

export const getDirectory = (directoryType) => {
    const baseObj = {
        url: directoryType,
        data: {},
    };
    return api.get(baseObj);
};

export const addDirectory = (directoryType, data) => {
    const baseObj = {
        url: directoryType,
        data,
    };

    return api.post(baseObj);
};

export const editDirectory = (directoryType, id, data) => {
    const baseObj = {
        url: `${directoryType}/${id}`,
        data,
    };

    return api.put(baseObj);
};
