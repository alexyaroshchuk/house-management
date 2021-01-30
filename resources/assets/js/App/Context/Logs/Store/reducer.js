import { SET_LOGS, SET_LOGS_LOADER } from './constants';

const PAGE_SIZE = 10;

const initialParams = {
    pagination: {
        page: 1,
        pageSize: PAGE_SIZE,
        total: 0,
    },
};

const getInitialParams = () => {
    return {
        ...initialParams,
    };
};

export const initialState = {
    logs: [],
    logsLoader: false,
    params: getInitialParams(),
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_LOGS:
            newState.logs = action.logs;
            break;
        case SET_LOGS_LOADER:
            newState.logsLoader = action.logsLoader;
            break;
        default:
            return newState;
    }
    return newState;
};
