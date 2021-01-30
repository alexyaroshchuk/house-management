import {
    SET_DASHBOARD,
    SET_PAYMENTS,
    SET_PAGINATION,
    SET_CREDITS,
    RESET_PARAMS,
} from './constants';

export const setDashboard = (dashboard) => ({
    type: SET_DASHBOARD,
    dashboard,
});

export const setPayments = (payments) => ({
    type: SET_PAYMENTS,
    payments,
});

export const setCredits = (credits) => ({
    type: SET_CREDITS,
    credits,
});

export const setPagination = (pagination) => ({
    type: SET_PAGINATION,
    pagination,
});

export const resetQueryParams = () => ({
    type: RESET_PARAMS,
});
