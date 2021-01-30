import { useState } from 'react';
import * as queries from '../Store/queries';
import { isFunction } from 'lodash';

export const useSellerActions = () => {
    const [modalLoader, setModalLoader] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const createMainContractRequest = (payload, errorCallback = () => {}) => {
        setModalLoader(true);

        queries
            .createMainSellerContract(payload)
            .then((response) => {
                setModalLoader(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                setModalLoader(true);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, payload);
            });
    };

    const editMainContractRequest = (payload, id, errorCallback = () => {}) => {
        setModalLoader(true);

        queries
            .editMainSellerContract(payload, id)
            .then((response) => {
                setModalLoader(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                setModalLoader(true);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, payload);
            });
    };

    const changeMainContractStatusRequest = (
        payload,
        id,
        errorCallback = () => {}
    ) => {
        setModalLoader(true);

        queries
            .changeMainSellerContractStatus(payload, id)
            .then((response) => {
                setModalLoader(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                setModalLoader(true);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, payload);
            });
    };

    return {
        modalLoader,
        isSuccess,
        setIsSuccess,
        createMainContract: createMainContractRequest,
        editMainContract: editMainContractRequest,
        changeMainContractStatus: changeMainContractStatusRequest,
    };
};

export default useSellerActions;
