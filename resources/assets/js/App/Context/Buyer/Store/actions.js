import { SET_BUYER } from './constants';

export const setBuyer = (buyer) => ({
    type: SET_BUYER,
    buyer,
});
