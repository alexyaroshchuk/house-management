import { SET_ANALYTICS } from './constants';

const initialFilters = {
    filters: {
        period: 'all',
    },
};

const getInitialFilters = () => {
    return {
        ...initialFilters,
    };
};

export const initialState = {
    analytics: {},
    params: getInitialFilters(),
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };

    switch (action.type) {
        case SET_ANALYTICS:
            newState.analytics = action.analytics;
            break;
        default:
            return newState;
    }

    return newState;
};
