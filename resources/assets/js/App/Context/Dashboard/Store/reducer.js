import {
    SET_DASHBOARD,
    SET_PAYMENTS,
    SET_PAGINATION,
    SET_CREDITS,
} from './constants';

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
    isLoading: false,
    dashboard: {},
    payments: [],
    credits: [],
    params: getInitialParams(),
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_DASHBOARD:
            newState.dashboard = action.dashboard;
            break;
        case SET_PAYMENTS:
            newState.payments = action.payments;
            break;
        case SET_PAGINATION:
            newState.params.pagination = action.pagination;
            break;
        case SET_CREDITS:
            newState.credits = action.credits;
            break;
        default:
            return newState;
    }

    return newState;
};
