import { SET_MANAGEMENT_INFO } from './constants';

export const setManagementInfo = (managementInfo) => ({
    type: SET_MANAGEMENT_INFO,
    managementInfo,
});
