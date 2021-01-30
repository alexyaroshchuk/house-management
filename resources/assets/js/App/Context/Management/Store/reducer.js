import { SET_MANAGEMENT_INFO } from './constants';

export const initialState = {
    managementInfo: [],
};

export const reducer = (state, action) => {
    const newState = state ? { ...state } : { ...initialState };
    switch (action.type) {
        case SET_MANAGEMENT_INFO:
            newState.managementInfo = action.managementInfo;
            break;

        default:
            return newState;
    }
    return newState;
};
