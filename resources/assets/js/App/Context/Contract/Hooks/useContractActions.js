import { useState } from 'react';
import { useContractContext } from './useContractContext';
import * as queries from '../Store/queries';
import { CONTRACT_TYPE } from '../Store/constants';
import { setModalLoader } from '../Store/actions';

const changeStatusQueries = {
    [CONTRACT_TYPE.BUYER]: queries.changeBuyerContractStatus,
    [CONTRACT_TYPE.SELLER]: queries.changeSellerContractStatus,
};

const addContractQueries = {
    [CONTRACT_TYPE.BUYER]: queries.addBuyerContract,
    [CONTRACT_TYPE.SELLER]: queries.addSellerContract,
};

const editContractQueries = {
    [CONTRACT_TYPE.BUYER]: queries.editBuyerContract,
    [CONTRACT_TYPE.SELLER]: queries.editSellerContract,
};

const deleteContractQueries = {
    [CONTRACT_TYPE.BUYER]: queries.deleteBuyerContract,
    [CONTRACT_TYPE.SELLER]: queries.deleteSellerContract,
};

export const useContractActions = () => {
    const { dispatch } = useContractContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const addContractRequest = (contract, type) => {
        dispatch(setModalLoader(true));
        setIsLoading(true);

        addContractQueries[type](contract)
            .then((response) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(false);
            });
    };

    const editContractRequest = (contract, id, type) => {
        dispatch(setModalLoader(true));
        setIsLoading(true);

        editContractQueries[type](contract, id)
            .then((response) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(false);
            });
    };

    const deleteContractRequest = (id, type) => {
        dispatch(setModalLoader(true));
        setIsLoading(true);

        deleteContractQueries[type](id)
            .then((response) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                dispatch(setModalLoader(false));
                setIsLoading(false);
                setIsSuccess(false);
            });
    };

    const changeContractStatusRequest = (type, id, payload) => {
        setIsLoading(true);
        changeStatusQueries[type](id, payload)
            .then((response) => {
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch(() => {
                setIsLoading(false);
                setIsSuccess(false);
            });
    };

    return {
        isLoading,
        isSuccess,
        setIsSuccess,
        changeContractStatus: changeContractStatusRequest,
        addContract: addContractRequest,
        editContract: editContractRequest,
        deleteContract: deleteContractRequest,
    };
};

export default useContractActions;
