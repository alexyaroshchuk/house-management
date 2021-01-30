import api from '../../../../Framework/Api/api';
import { BUYER_CONTRACTS_REQUEST, SELLER_CONTRACTS_REQUEST } from './constants';

export const getBuyerContracts = (status, params = {}, config = {}) => {
    const baseObj = {
        url: `${BUYER_CONTRACTS_REQUEST[status]}`,
        params,
        config,
    };
    return api.get(baseObj);
};

export const getSellerContracts = (status, params = {}, config = {}) => {
    const baseObj = {
        url: `${SELLER_CONTRACTS_REQUEST[status]}`,
        params,
        config,
    };
    return api.get(baseObj);
};
