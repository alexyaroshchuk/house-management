import { useState } from 'react';
import { get } from 'lodash';
import { useContractsContext } from './useContractsContext';
import * as queries from '../Store/queries';
import { CONTRACTS_TYPE } from '../Store/constants';
import * as actions from '../Store/actions';
import { createCancelToken, checkCancelToken } from '@API/api.js';

const queriesObj = {
    [CONTRACTS_TYPE.BUYER]: queries.getBuyerContracts,
    [CONTRACTS_TYPE.SELLER]: queries.getSellerContracts,
};

const actionsObj = {
    [CONTRACTS_TYPE.BUYER]: actions.setBuyerContracts,
    [CONTRACTS_TYPE.SELLER]: actions.setSellerContracts,
};

let cancelToken;

export const useGetContracts = () => {
    const {
        state: { contracts, contractsLoader },
        dispatch,
    } = useContractsContext();

    const getCancelToken = () => {
        if (cancelToken) {
            cancelToken.cancel('Canceled request');
        }
        cancelToken = createCancelToken();
        return cancelToken.token;
    };

    const getContracts = (type, status, params) => {
        dispatch(actions.setContractsLoader(true));

        const config = {
            cancelToken: getCancelToken(),
        };

        queriesObj[type](status, params, config)
            .then((response) => {
                const newContracts = get(response, 'data.payload', []);
                const pagination = get(response, 'data.pagination', {});
                const search = get(response, 'data.search', '');

                dispatch(actions.setContractsLoader(false));

                dispatch(actionsObj[type](newContracts));
                dispatch(actions.setPagination(pagination));
                dispatch(actions.setSearch(search));
            })
            .catch((error) => {
                if (checkCancelToken(error)) {
                    console.warn('Get contracts request canceled');
                    return;
                }
                dispatch(actions.setContractsLoader(false));
            });
    };

    return { contracts, contractsLoader, getContracts };
};

export default useGetContracts;
