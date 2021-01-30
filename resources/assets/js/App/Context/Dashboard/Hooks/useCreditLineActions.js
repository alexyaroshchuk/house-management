import { useState } from 'react';
import { isFunction } from 'lodash';
import {
    addCreditLine,
    editCreditLine,
    deleteCreditLine,
} from '../Store/queries';

export const useCreditLineActions = () => {
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const addCreditLineRequest = (values, errorCallback = () => {}) => {
        setIsModalLoading(true);

        addCreditLine(values)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    const editCreditLineRequest = (values, id, errorCallback = () => {}) => {
        setIsModalLoading(true);

        editCreditLine(values, id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    const deleteCreditLineRequest = (id, errorCallback = () => {}) => {
        setIsModalLoading(true);

        deleteCreditLine(id)
            .then((response) => {
                setIsModalLoading(false);
                setIsSuccess(true);
            })
            .catch((error) => {
                const { errors } = error.response.data;
                setIsModalLoading(false);
                setIsSuccess(false);
                isFunction(errorCallback) && errorCallback(errors, values);
            });
    };

    return {
        isModalLoading,
        isSuccess,
        setIsSuccess,
        addCreditLine: addCreditLineRequest,
        editCreditLine: editCreditLineRequest,
        deleteCreditLine: deleteCreditLineRequest,
    };
};

export default useCreditLineActions;
